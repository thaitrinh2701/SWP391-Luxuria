package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.dtos.ProductDataDTO;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.exceptions.InvalidParamException;
import com.luxuria.models.*;
import com.luxuria.repositories.*;
import com.luxuria.responses.ProductResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final GoldRepository goldRepository;
    private final GemRepository gemRepository;
    private final ProductDataRepository productDataRepository;
    private final ProductDataService productDataService;

    @Override
    public List<ProductResponse> getAllOriginalProducts() throws Exception {
        List<Product> products = productRepository.findAllOriginalProducts();
        return getProductResponseFromProductList(products);
    }

    @Override
    public List<Product> getAllOriginalProductsWithoutImages() {
        return productRepository.findAllOriginalProducts();
    }

    @Override
    public Product getProductById(Long productId) throws Exception {
        return productRepository.findById(productId)
                .orElseThrow(() -> new DataNotFoundException("product: Sản phẩm không tồn tại"));
    }

    @Override
    public Product createProduct(ProductDTO productDTO) throws Exception {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("category: Danh mục không tồn tại"));

        Gold gold = goldRepository.findById(productDTO.getGoldId())
                .orElseThrow(() -> new DataNotFoundException("gold: Loại vàng không tồn tại"));

        Gem gem = gemRepository.findById(productDTO.getGemId())
                .orElseThrow(() -> new DataNotFoundException("gem: Loại đá không tồn tại"));

        Product product = Product.builder()
                .name(productDTO.getName())
                .category(category)
                .size(productDTO.getSize())
                .gold(gold)
                .goldPrice(productDTO.getGoldPrice())
                .goldWeight(productDTO.getGoldWeight())
                .gem(gem)
                .gemPrice(productDTO.getGemPrice())
                .manufacturingFee(productDTO.getManufacturingFee())
                .totalPrice(productDTO.getTotalPrice())
                .description(productDTO.getDescription())
                .isOriginal(productDTO.isOriginal())
                .build();

        return productRepository.save(product);
    }

    @Override
    public ProductData createProductData(Long productId, ProductDataDTO productDataDTO) throws Exception {
        Product existProduct = getProductById(productId);
        ProductData newProductImage = ProductData
                .builder()
                .product(existProduct)
                .value(productDataDTO.getValue())
                .build();
        int size = productDataRepository.findAllByProductId(productId).size();
        if (size >= ProductData.MAXIMUM_IMAGES_PER_PRODUCT) {
            throw new InvalidParamException("Số lượng ảnh không được vượt quá "
                    + ProductData.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        return productDataRepository.save(newProductImage);
    }



    @Override
    public List<ProductData> uploadFiles(Product product, List<MultipartFile> files) throws Exception {
        files = (files == null) ? new ArrayList<>() : files;
        if (files.size() > ProductData.MAXIMUM_IMAGES_PER_PRODUCT) {
            throw new InvalidParamException("product_data: Số lượng ảnh tối đa có thể tải lên là "
                    + ProductData.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        for (MultipartFile file : files) {
            if (file.getSize() == 0) continue;

            if (file.getSize() > 25 * 1024 * 1024) {
                throw new InvalidParamException("product_data: Kích thước ảnh tối đa là 25MB");
            }
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new InvalidParamException("product_data: Định dạng file phải là ảnh");
            }
        }

        List<ProductData> productImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String base64Image = encodeBase64(file);
            ProductData productImage = createProductData(
                    product.getId(),
                    ProductDataDTO.builder()
                            .value(base64Image)
                            .build());
            productImages.add(productImage);
        }

        return productImages;
    }

    @Override
    public Product updatePrice(Long productId, ProductDTO productDTO) throws Exception {
        Product product = getProductById(productId);
        product.setGoldPrice(productDTO.getGoldPrice());
        product.setGemPrice(productDTO.getGemPrice());
        product.setManufacturingFee(productDTO.getManufacturingFee());
        product.setTotalPrice(productDTO.getTotalPrice());
        return productRepository.save(product);
    }

    @Override
    public List<ProductResponse> viewOriginalProductsByCategory(Long categoryId) throws Exception {
        if (categoryRepository.existsById(categoryId)) {
            List<Product> products = productRepository.findAllOriginalProductsByCategory(categoryId);
            return getProductResponseFromProductList(products);
        }
        throw new DataNotFoundException("category: Danh mục không tồn tại");
    }

    @Override
    public void updateOriginalProduct(Long productId, ProductDTO productDTO) throws Exception {
        Product product = getProductById(productId);
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("category: Danh mục không tồn tại"));

        Gold gold = goldRepository.findById(productDTO.getGoldId())
                .orElseThrow(() -> new DataNotFoundException("gold: Loại vàng không tồn tại"));

        Gem gem = gemRepository.findById(productDTO.getGemId())
                .orElseThrow(() -> new DataNotFoundException("gem: Loại đá không tồn tại"));

        product.setName(productDTO.getName());
        product.setCategory(category);
        product.setSize(productDTO.getSize());
        product.setGold(gold);
        product.setGoldWeight(productDTO.getGoldWeight());
        product.setGoldPrice(productDTO.getGoldPrice());
        product.setGem(gem);
        product.setGemPrice(productDTO.getGemPrice());
        product.setManufacturingFee(productDTO.getManufacturingFee());
        product.setTotalPrice(productDTO.getTotalPrice());
        product.setDescription(productDTO.getDescription());
        product.setOriginal(product.isOriginal());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void updateOriginalProductData(Long productId, List<MultipartFile> files) throws Exception {
        Product product = getProductById(productId);
        productDataRepository.deleteAllByProductId(productId);
        uploadFiles(product, files);
    }

    @Override
    @Transactional
    public void deleteProduct(Long productId) throws Exception {
        productDataRepository.deleteAllByProductId(productId);
        productRepository.deleteById(productId);
    }

    private String encodeBase64(MultipartFile file) throws IOException {
        byte[] imageBytes = file.getBytes();
        return  Base64.getEncoder().encodeToString(imageBytes);
    }

    private List<ProductResponse> getProductResponseFromProductList(List<Product> products) throws Exception {
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product: products) {
            List<ProductData> productDataList = productDataService.getProductDataByProductId(product.getId());
            ProductResponse productResponse = ProductResponse.builder()
                    .product(product)
                    .productDataList(productDataList)
                    .build();
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    //    private String storeFile(MultipartFile file) throws IOException {
//        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
//        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
//        java.nio.file.Path uploadDir = Paths.get("uploads");
//        if (!Files.exists(uploadDir)) {
//            Files.createDirectories(uploadDir);
//        }
//        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFileName);
//        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
//        return uniqueFileName;
//    }
}
