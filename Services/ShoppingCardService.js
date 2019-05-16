var ShoppingCardService = {
    _createShoppingCardTable: function () {
        return new Promise((resolve, reject) => {
            if (document.readyState) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('CREATE TABLE shoppingcard (shoppingcard_id INTEGER PRIMARY KEY autoincrement , shoppingcard_name VARCHAR2(30) , product_id INTEGER, user_nickname VARCHAR2(20), product_number INTEGER , product_price INTEGER )', [], function (transaction, result) {
                        resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "sayfa yüklenemedi.";
                reject(msg);
            }
        })
    },
    _shoppingCardInsertControl: function (nickName) {
        return new Promise((resolve, reject) => {
            if (nickName != "" && nickName != null) {
                veritabani.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM shoppingcard WHERE user_nickname=?', [nickName], function (transaction, result) {
                        resolve(result);
                    }, function (transaction, error) {
                        reject(error);
                    });
                });
            } else {
                var msg = "parametreler istenilen şekilde gelmedi.";
                reject(msg);
            }
        })
    },
    _shoppingCardInsert: function (shoppingcardName, productId, userNickname, productNumber, productPrice) {
        return new Promise((resolve, reject) => {
            veritabani.transaction(function (fx) {
                fx.executeSql('INSERT INTO shoppingcard (shoppingcard_name , product_id , user_nickname , product_number , product_price) VALUES (?,?,?,?,?)', [shoppingcardName, productId, userNickname, productNumber, productPrice], function (transaction, result) {
                    resolve(result);
                }, function (transaction, error) {
                    reject(error);
                });
            });
        })
    },
    _shoppingCardUpdate: function (userNickname, productId) {
        return new Promise((resolve, reject) => {
            if (productId != "" && productId != null && userNickname != "" && userNickname != null) {
                veritabani.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM shoppingcard WHERE user_nickname=?', [userNickname], function (transaction, result) {
                        jQuery.each(result.rows, function (_index, value) {
                            var eski_adet = value.product_number;
                            var eklenecek_adet = parseInt(Cookies.get('adet'));
                            var urun_adet = eski_adet + eklenecek_adet;
                            tx.executeSql('UPDATE shoppingcard SET product_number=? WHERE product_id=?', [urun_adet, productId], function (transaction, result) {
                                resolve(result);
                            });
                        });
                    }, function (transaction, error) {
                        reject(error)
                    });
                });
            } else {
                var msg = "parametreler istenilen şekilde gelmedi.";
                reject(msg);
            }
        })
    },
    _shoppingCardList: function (userNickname) {
        return new Promise((resolve, reject) => {
            veritabani.transaction(function (tx) {
                tx.executeSql('SELECT * FROM shoppingcard WHERE user_nickname=?', [userNickname], function (transaction, result) {
                    resolve(result)
                }, function (transaction, error) {
                    reject(error);
                });
            });
        })
    },
    _getWithProductId: function (productId) {
        return new Promise((resolve, reject) => {
            veritabani.transaction(function (tx) {
                tx.executeSql('SELECT * FROM products WHERE product_id=?', [productId], function (transaction, result) {
                    resolve(result);
                }, function (transaction, error) {
                    reject(error);
                })
            })
        })
    },
    _shoppingCardProductDelete: function (productId) {
        return new Promise((resolve, reject) => {
            veritabani.transaction(function (tx) {
                tx.executeSql('DELETE FROM shoppingcard WHERE product_id=?', [productId], function (transaction, result) {
                    resolve(result);
                }, function (transaction, error) {
                    reject(error);
                });
            });
        })
    },
    _shoppingCardClear: function (userNickname) {
        return new Promise((resolve, reject) => {
            veritabani.transaction(function (tx) {
                tx.executeSql('DELETE FROM shoppingcard WHERE user_nickname=?', [userNickname], function (transaction, result) {
                    resolve(result);
                }, function (transaction, error) {
                    reject(error);
                });
            });
        })
    }
}