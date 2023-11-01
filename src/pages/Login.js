/* eslint-disable no-undef */

import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Login() {
  const [user, setUser] = useState(null); // Sử dụng state để lưu thông tin tài khoản Google

  const handleGoogleSignIn = () => {
    google.accounts.id.prompt(); // Mở hộp thoại Đăng nhập Google
  };

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      // Xử lý thông tin tài khoản Google sau khi đăng nhập thành công
      console.log("Encoded JWT ID token: " + response.credential);
      var decoded = jwt_decode(response.credential);
      setUser(decoded);

      // Lưu token vào localStorage
      localStorage.setItem("jwtToken", response.credential);

      // Truy cập email và console.log
      const email = decoded.email;
      console.log("Email:", email);

      // Chuyển hướng sau khi đăng nhập thành công
      window.location.href = "/"; // Thay đổi đường dẫn tới trang chính

      document.getElementById("buttonDiv").hidden = true;
    };

    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Google Identity API script đã được tải
        google.accounts.id.initialize({
          client_id:
            "996390143526-g3bp42ak4u7gca1no3m95s98ce4b9sv0.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
          theme: "outline",
          size: "large",
        });
        google.accounts.id.prompt();
      };
      document.head.appendChild(script);
    };

    // Kiểm tra xem đối tượng 'google' có được định nghĩa không
    if (window.google && window.google.accounts) {
      // Nếu đã được định nghĩa, tải script ngay lập tức
      loadGoogleScript();
    } else {
      // Nếu không được định nghĩa, đợi một thời gian ngắn và thử lại
      setTimeout(() => {
        if (window.google && window.google.accounts) {
          loadGoogleScript();
        } else {
          console.error("Không thể tải Google Identity API.");
        }
      }, 1000); // Bạn có thể điều chỉnh thời gian chờ nếu cần
    }
  }, []);
  return (
    <div>
      <Nav></Nav>
      <div className="form1">
        <form className="formlogin">
          <div>
            <h2>Login</h2>
          </div>

          <div>
            <h4>Username</h4>
            <input type="text"></input>
          </div>
          <div>
            <h4>Password</h4>
            <input type="password"></input>
          </div>
         <div className="lgin">
          <div className="bttonLogin">
            <button type="submit">LOGIN</button>
          </div> <div>
           
              <div id="buttonDiv"></div>
             
          </div></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
