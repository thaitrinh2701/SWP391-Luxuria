package com.luxuria.components;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class EmailUntil {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendResetPasswordEmail(String email) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setFrom("noreply.luxuria727@gmail.com");
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Đổi Mới Mật Khẩu");
        mimeMessageHelper.setText("""
                <div>
                    <p> Xin chào, bạn vừa gửi yêu cầu đổi mật khẩu, vui lòng nhấn vào đường dẫn bên dưới để thay đổi mật khẩu </p>
                    <a href="http://localhost:5173/reset-password-detail?email=%s" target="_blank">Bấm vào đây để đặt lại mật khẩu</a>
                    <p> Nếu như bạn không yêu cầu điều này, vui lòng bỏ qua thông báo này ! </p>
                </div>
                """.formatted(email), true);
        javaMailSender.send(mimeMessage);
    }
}
