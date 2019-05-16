var ProductService = {
    _productCreateTable: function () {
        return new Promise((resolve, reject) => {
            if (document.readyState) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('CREATE TABLE products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR2(30), product_model VARCHAR2(30), product_text VARCHAR2(200) , product_price INTEGER(30) , product_image VARCHAR2(100))', [],
                        function (transaction, result) {
                            resolve(result);
                        },
                        function (transaction, error) {
                            reject(error);
                        })
                })
            } else {
                var msg = "sayfa yüklenemedi.";
                reject(msg);
            }
        })
    },
    _productCreate: function (productName, productModel, productText, productPrice, productImage) {
        return new Promise((resolve, reject) => {
            if (productName != "" && productName != null && productModel != "" && productModel != null &&
                productText != "" && productText != null && productPrice != "" && productPrice != null && productImage != "" && productImage != null) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('INSERT INTO products (product_name,product_model,product_text,product_price,product_image) VALUES (?,?,?,?,?)', [productName, productModel, productText, productPrice, productImage], function (transaction, result) {
                        resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "lüften tüm alanları doldurunuz."
                reject(msg)
            }
        })
    },
    _productList: function () {
        return new Promise((resolve, reject) => {
            if (document.readyState) {
                veritabani.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM products', [], function (transaction, result) {
                        if (result.rows.length > 0) resolve(result);
                    }, function (transaction, error) {
                        reject(error)
                    });
                });
            } else {
                var msg = "sayfa yüklenemedi.";
                reject(msg);
            }
        })
    },
    _productSingleRead: function (index) {
        return new Promise((resolve, reject) => {
            if (index != "" && index != null) {
                veritabani.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM products WHERE product_id=?', [index], function (transaction, result) {
                        if (result.rows.length > 0) resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                })
            } else {
                var msg = "product_id okunamadı";
                reject(msg);
            }
        })
    },
    _productDelete: function (index) {
        return new Promise((resolve, reject) => {
            if (index != "" && index != null) {
                veritabani.transaction(function (tx) {
                    tx.executeSql('DELETE FROM products WHERE product_id=?', [index], function (transaction, result) {
                        resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "product_id istenilen şekilde gelmedi.";
                reject(msg);
            }
        })
    },
    _productUpdateTextWrite: function (index) {
        return new Promise((resolve, reject) => {
            if (index != "" && index != null) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('select* from products WHERE product_id=?', [index], function (transaction, result) {
                        if (result.rows.length > 0) resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "product_id istenilen şekilde gelmedi.";
                reject(msg);
            }
        })
    },
    _productUpdate: function (productName, productModel, productText, productPrice, index) {
        return new Promise((resolve, reject) => {
            if (productName != "" && productName != null && productModel != "" && productModel != null &&
                productText != "" && productText != null && productPrice != "" && productPrice != null && index != "" && index != null) {
                veritabani.transaction(function (fx) {

                    fx.executeSql('UPDATE products SET product_name=?,product_model=?,product_text=?,product_price=? WHERE product_id=?', [productName, productModel, productText, productPrice, index], function (transaction, result) {
                        resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "lütfen tüm alanları doldurunuz.";
                reject(msg);
            }
        })
    }
}