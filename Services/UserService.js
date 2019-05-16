var UserService = {
    _userCreateTable: function () {
        return new Promise((resolve, reject) => {
            if (document.readyState) {
                databaseOpen();
                veritabani.transaction(function (fx) {
                    fx.executeSql('CREATE TABLE IF NOT EXISTS users (user_id INTEGER , user_name VARCHAR2(30), user_surname VARCHAR2(30), user_nickname ' +
                        'VARCHAR2(20) PRIMARY KEY, user_password VARCHAR2(15))', [],
                        function (transaction, result) {
                            resolve(result);
                        },
                        function (transaction, error) {
                            reject(error);
                        })
                })
            } else {
                var msg = "sayfa yüklenemedi";
                reject(msg)
            }
        })
    },
    _loginControl: function (nickname, password) {
        return new Promise((resolve, reject) => {
            if (nickname != "" && nickname != null && password != "" && password != null) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('SELECT * FROM users WHERE user_nickname=? AND user_password=?', [nickname, password], function (transaction, result) {
                        if (result.rows.length > 0) { //eğer şarta uygun kayıt varsa
                            resolve(result) //istenilen sayfaya yönlendirir.
                        } else { //uygun kayıt yoksa
                            var err = "Hatalı deneme. Lütfen tekrar deneyiniz."; //hatalı deneme uyarısı verir.
                            reject(err);
                        }
                    });
                });

            } else {
                var msg = "lütfen bilgileri tam ve eksiksiz giriniz.";
                reject(msg)
            }
        })
    },
    _userCreateControl: function (signUpName, signUpSurname, signUpNickname, signUpPassword) {
        return new Promise((resolve, reject) => {
            if (signUpName != "" && signUpName != null && signUpSurname != "" && signUpSurname != null &&
                signUpNickname != "" && signUpNickname != null && signUpPassword != "" && signUpPassword != null
            ) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('SELECT * FROM users', [], function (transaction, result) {
                        if (result.rows.length == 0) {
                            resolve(true);
                        }
                        jQuery.each(result.rows, function (_index, value) {
                            if (signUpNickname === value.user_nickname) {
                                var msg = "denendiğiniz kullanıcı adi ile kayıt bulunmaktadır. lütfen başka kullanıcı adi ile kayıt olmayı deneyiniz.";
                                reject(msg);
                            } else {
                                resolve(true);
                            }
                        });
                    }, function (transaction, error) {
                        var err = "Hata: " + error;
                        reject(err);
                    });
                })
            } else {
                var msg = "lütfen bilgileri tam ve eksiksiz giriniz.";
                reject(msg);
            }
        })
    },
    _userCreate: function (signUpName, signUpSurname, signUpNickname, signUpPassword) {
        return new Promise((resolve, reject) => {
            if (signUpName != "" && signUpName != null && signUpSurname != "" && signUpSurname != null &&
                signUpNickname != "" && signUpNickname != null && signUpPassword != "" && signUpPassword != null
            ) {
                veritabani.transaction(function (fx) {
                    fx.executeSql('INSERT INTO users (user_name,user_surname,user_nickname,user_password) VALUES (?,?,?,?)', [signUpName, signUpSurname, signUpNickname, signUpPassword], function (transaction, result) {
                            resolve(result)
                        }),
                        function (transaction, error) {
                            reject(new Error(error));
                        };
                })
            } else {
                var msg = "bilgileriniz hatal lütfen kontrol ediniz."
                reject(alert(msg));
            }
        })
    }

}