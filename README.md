# 项目初始化

```
npx nuxi@latest init my-bilibili
```

# b站图片防盗链解决

```
export default defineNuxtConfig({
  // 开启ssr服务端渲染，默认开启
  ssr: true,
  // 开启调试工具
  devtools: { enabled: true },
  // 应用模块
  modules: ["@vant/nuxt"],
  app: {
    head: {
      meta: [{ name: "referrer", content: "no-referrer" }],
    },
  },
});

```

# 部署

### 打包

```
npm run build
```

### 安装nodejs

https://help.aliyun.com/zh/ecs/use-cases/deploy-a-node-js-environment-on-an-alibaba-cloud-linux-2-instance

### 安装pm，启动项目

[Linux部署nuxt3_木头没有瓜的博客-CSDN博客](https://blog.csdn.net/weixin_40918145/article/details/128972255)

https://www.iwecore.cn/article/14

### 二级域名

[Nginx/阿里云/二级域名的配置和使用](https://developer.aliyun.com/article/918604)

[阿里云nginx服务器如何配置ssl证书,让你的网站添加https](https://developer.aliyun.com/article/707479)

### nginx配置

```
server {
  listen 80;
  listen [::]:80;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  ssl_certificate /usr/local/nginx/conf/ssl/bilibili.mundane.ink.pem;
  ssl_certificate_key /usr/local/nginx/conf/ssl/bilibili.mundane.ink.key;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_ciphers TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
  ssl_prefer_server_ciphers on;
  ssl_session_timeout 10m;
  ssl_session_cache builtin:1000 shared:SSL:10m;
  ssl_buffer_size 1400;
  add_header Strict-Transport-Security max-age=15768000;
  ssl_stapling on;
  ssl_stapling_verify on;
  server_name bilibili.mundane.ink;
  access_log /data/wwwlogs/bilibili_nginx.log combined;

  location / {
    proxy_pass   http://127.0.0.1:3000;
  }

}
```

