-- Create database structure for the Laptop Store
CREATE DATABASE IF NOT EXISTS laptopstore;
USE laptopstore;
drop table laptops;
-- Create the laptops table
CREATE TABLE laptops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prodtype VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    brand VARCHAR(100),
    price DECIMAL(10, 2),
    processor VARCHAR(100),
    ram VARCHAR(100),
    harddrive VARCHAR(100),
    thumbnail_url VARCHAR(255)
);


INSERT INTO laptops (prodtype, model, brand, price, processor, ram, harddrive, thumbnail_url) VALUES
('Gaming', 'Predator Helios 300', 'Acer', 1199.99, 'Intel Core i7-10750H', '16GB', '512GB SSD', 'https://images.acer.com/is/image/acer/Predator-Helios-300-PH-315-54-Backliton-Black-01a-1?$Visual-Filter-XL$'),
('Ultrabook', 'XPS 13', 'Dell', 999.99, 'Intel Core i5-1035G1', '8GB', '256GB SSD', 'https://m.media-amazon.com/images/I/71mZX9sv3dL._AC_SL1500_.jpg'),
('Gaming', 'Legion 5', 'Lenovo', 1050.00, 'AMD Ryzen 7 4800H', '16GB', '512GB SSD', 'https://p1-ofp.static.pub/fes/cms/2022/08/04/p2w4kuhucetyoxlbipmc10rq83lmdq376836.png'),
('Business', 'Elite Dragonfly', 'HP', 1500.50, 'Intel Core i7-8565U', '16GB', '512GB SSD', 'https://m.media-amazon.com/images/I/61kcCOEbrIL._AC_SL1500_.jpg'),
('MacBook', 'MacBook Air', 'Apple', 999.00, 'Apple M1', '8GB', '256GB SSD', 'https://www.apple.com/v/macbook-air/s/images/overview/performance/compare/model_mba_m2__cfrbip6c05yq_large.jpg'),
('MacBook', 'MacBook Pro 13', 'Apple', 1299.00, 'Apple M1', '8GB', '256GB SSD', 'https://www.apple.com/v/macbook-pro/ak/images/overview/contrast/product_tile_mba_13_15__cw1q3qd2yyeu_large.png'),
('Chromebook', 'Chromebook Flip', 'Asus', 569.99, 'Intel Core m3-8100Y', '4GB', '64GB eMMC', 'https://dlcdnwebimgs.asus.com/gain/487a0782-7d91-46ff-9d7a-27ef02f04373/w692'),
('Notebook', 'ThinkPad X1 Carbon', 'Lenovo', 1429.00, 'Intel Core i7-10510U', '16GB', '1TB SSD', 'https://p4-ofp.static.pub//fes/cms/2023/11/21/le0uqb8z2cblfvr479hf551go976hy315224.jpg'),
('Gaming', 'Alienware m15', 'Dell', 1800.00, 'Intel Core i7-9750H', '16GB', '1TB SSD', 'https://m.media-amazon.com/images/I/71ZbkpSNuaL._AC_SL1500_.jpg'),
('2-in-1', 'Spectre x360', 'HP', 1150.00, 'Intel Core i7-1065G7', '16GB', '512GB SSD', 'https://m.media-amazon.com/images/I/81xBzEmTw3L._AC_SL1500_.jpg'),
('Business', 'Latitude 7410', 'Dell', 1200.00, 'Intel Core i7-10610U', '16GB', '256GB SSD', 'https://m.media-amazon.com/images/I/61TqKqfItFL._AC_SL1500_.jpg'),
('Ultrabook', 'Swift 3', 'Acer', 679.99, 'AMD Ryzen 7 4700U', '8GB', '512GB SSD', 'https://images.acer.com/is/image/acer/acer-swift-3-sf314-512-sf-314-512t-fingerprint-backlit-on-wallpaper-pure-silver-01-1?$Visual-Filter-XL$'),
('Gaming', 'ROG Zephyrus G14', 'Asus', 1449.99, 'AMD Ryzen 9 4900HS', '16GB', '1TB SSD', 'https://dlcdnwebimgs.asus.com/gain/240A80BA-EBF7-443F-90EA-119116DA83D3/w1000/h732'),
('2-in-1', 'Yoga C940', 'Lenovo', 1200.00, 'Intel Core i7-1065G7', '12GB', '512GB SSD', 'https://m.media-amazon.com/images/I/51fJY6KNP7L._AC_SL1000_.jpg'),
('Notebook', 'Pavilion 15', 'HP', 630.00, 'Intel Core i5-1035G1', '8GB', '512GB SSD', 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07961200.png');



#INSERT INTO laptops (prodtype, model, brand, price, processor, ram, harddrive, thumbnail_url) VALUES
#('Gaming', 'Predator Triton 300', 'Acer', 1199.99, 'Intel Core i7', '16GB', '1TB SSD', 'Images/triton300.png'),
#('Business', 'ThinkPad X1 Carbon', 'Lenovo', 1429.00, 'Intel Core i5', '8GB', '256GB SSD', 'https://p2-ofp.static.pub/fes/cms/2023/02/10/6dmutrro4s0mhknbkz259ck6tce3su835220.png'),
#('Ultrabook', 'XPS 13', 'Dell', 999.99, 'Intel Core i7', '8GB', '512GB SSD', 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/umber/notebook-xps-13-9315-umber-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=584&qlt=100,1&resMode=sharp2&size=584,402&chrss=full'),
#('Gaming', 'ROG Zephyrus G14', 'ASUS', 1349.99, 'AMD Ryzen 9', '16GB', '1TB SSD', 'https://dlcdnwebimgs.asus.com/gain/240A80BA-EBF7-443F-90EA-119116DA83D3/w1000/h732'),
#('Convertible', 'Spectre x360', 'HP', 1159.99, 'Intel Core i7', '16GB', '512GB SSD', 'https://example.com/spectrex360.jpg'),
#('MacBook', 'MacBook Pro 13', 'Apple', 1299.99, 'Apple M1', '8GB', '256GB SSD', 'https://example.com/macbookpro13.jpg'),
#('Gaming', 'Alienware m15', 'Dell', 1799.99, 'Intel Core i7', '32GB', '1TB SSD', 'https://example.com/alienwarem15.jpg'),
#('Business', 'EliteBook 840', 'HP', 1239.99, 'Intel Core i5', '8GB', '256GB SSD', 'https://example.com/elitebook840.jpg'),
#('Ultrabook', 'Swift 5', 'Acer', 899.99, 'Intel Core i5', '8GB', '512GB SSD', 'https://example.com/swift5.jpg'),
#('Convertible', 'Yoga C740', 'Lenovo', 859.99, 'Intel Core i5', '8GB', '256GB SSD', 'https://example.com/yogac740.jpg');

select * from laptops;