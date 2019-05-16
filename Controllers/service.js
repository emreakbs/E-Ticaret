//database Open
function databaseOpen() {
    var veriTabani_ad = 'e-Ticaret-v1.2';
    var veriTabani_version = '1.0';
    var veriTabani_tanim = 'WebSql Veri Tabanı';
    var veriTabani_boyut = 10 * 1024 * 1024;
    this.veritabani = window.openDatabase(veriTabani_ad, veriTabani_version, veriTabani_tanim, veriTabani_boyut);
}

//                      LOGIN SAYFASI FONKSİYONLARI
//                      LOGIN SAYFASI FONKSİYONLARI
//                      LOGIN SAYFASI FONKSİYONLARI

//kullanıcı tablosu oluşturulur.
var userCreateTable = () => {
    UserService._userCreateTable().then(fullfilled => {
        console.log(fullfilled);
    }).catch((rejected) => {
        console.log(rejected);
    })
}

//kullanıcı giriş kontrolü yapılır.
var loginControl = () => {
    var sys_name;
    var sys_surname;
    var sys_nickname;
    var loginNickname = $("#txt_userName").val();
    var loginPassword = $("#txt_password").val();
    UserService._loginControl(loginNickname, loginPassword).then(fullfilled => {
        sys_name = fullfilled.rows[0].user_name;
        sys_surname = fullfilled.rows[0].user_surname;
        sys_nickname = fullfilled.rows[0].user_nickname;
        Cookies.set('sys_name', sys_name);
        Cookies.set('sys_surname', sys_surname);
        Cookies.set('sys_nickname', sys_nickname);
        location = "homePage.html";
    }).catch(rejected => {
        alert(rejected);
        $("#txt_userName").val("");
        $("#txt_password").val("");
    })
}

//                      SIGNUP SAYFASI FONKSİYONLARI
//                      SIGNUP SAYFASI FONKSİYONLARI
//                      SIGNUP SAYFASI FONKSİYONLARI

//kullanıcın var olup olmadığını kontrol eder.
var userCreateControl = () => {
    var signUp_name = $("#txt_SignUp_Name").val();
    var signUp_surName = $("#txt_SignUp_SurName").val();
    var signUp_nickName = $("#txt_SignUp_NickName").val();
    var signUp_password = $("#txt_signUp_Password").val();
    UserService._userCreateControl(signUp_name, signUp_surName, signUp_nickName, signUp_password).then(fullfilled => {
        if (fullfilled) userCreate();
    }).catch(rejected => {
        alert(rejected);
        signUpTextClear();
    })
}

//kullanıcı oluşturma fonksiyonu
var userCreate = () => {
    var signUp_name = $("#txt_SignUp_Name").val();
    var signUp_surName = $("#txt_SignUp_SurName").val();
    var signUp_nickName = $("#txt_SignUp_NickName").val();
    var signUp_password = $("#txt_signUp_Password").val();
    UserService._userCreate(signUp_name, signUp_surName, signUp_nickName, signUp_password).then(fullfilled => {
        console.log("oluşturulan hayıt: ", fullfilled);
        alert("kayıt başarı ile oluşturuldu.")
        window.location = "login.html";
    }).catch(rejected => {
        console.log(rejected);
        signUpTextClear();
    })
}
//signup sayfasındaki texleri temizler
var signUpTextClear = () => {
    signUp_name = "";
    signUp_surName = "";
    signUp_nickName = "";
    signUp_password = "";
    $("#txt_SignUp_Name").val("");
    $("#txt_SignUp_SurName").val("");
    $("#txt_SignUp_NickName").val("");
    $("#txt_signUp_Password").val("");
}


//                      HOMEPAGE SAYFASI FONKSİYONLARI
//                      HOMEPAGE SAYFASI FONKSİYONLARI
//                      HOMEPAGE SAYFASI FONKSİYONLARI

//anasayfada kullancı bilgilerini göstermek için kullanılır.
var divUserInfo = () => {
    var isim = Cookies.get('sys_name');
    var soyisim = Cookies.get('sys_surname');
    var kullaniciAdi = Cookies.get('sys_nickname');

    $("#div_user_information").append("<div id=\"card-top\" class=\"card\" style=\"width: 18rem;>" +
        "<ul class=\"list-group list-group-flush>" +
        " <li class=\"list-group-item\">" + isim + "</li>" +
        "<li class=\"list-group-item\">" + soyisim + "</li>" +
        "<li class=\"list-group-item\">" + kullaniciAdi + "</li>" +
        "</ul>" +
        "</div>");
}

// fiyat textine string karakter önlemek için kullanılır. 
var textNumberControl = () => {
    //numerik girişleri kontrol eder.
    $('input[name="number"]').keyup(function (e) {
        if (/\D/g.test(this.value)) {
            this.value = this.value.replace(/\D/g, '');
        }
    });
}

//product tablosunu oluşturur.
var productCreateTable = () => {
    ProductService._productCreateTable().then(fullfilled => {
        console.log("tablo eklendi");
        console.log(fullfilled);
    }).catch((rejected) => {
        console.log(rejected);
    })
}

//ürün oluşturma fonksiyonu
var productCreate = () => {
    var product_Name = $("#txt_product_Name").val();
    var product_Model = $("#txt_product_Model").val();
    var product_Text = $("#txt_product_Text").val();
    var product_Price = parseInt($("#txt_product_Price").val());
    var product_image;

    // resimin yolunu alır
    var imageSelector = document.querySelector('img');
    var fileSelector = document.querySelector('input[type=file]').files[0];
    if (fileSelector) {
        product_image = fileSelector.name;
    } else imageSelector.src = "";

    ProductService._productCreate(product_Name, product_Model, product_Text, product_Price, product_image).then(fullfilled => {
        console.log(fullfilled);
        alert("ürün başarı ile eklendi");
        window.location = 'homePage.html';
    }).catch(rejected => {
        alert(rejected);
    })
}

//anasayfada ürünleri listeleme yarar.
var productList = () => {
    ProductService._productList().then(fullfilled => {
        console.log("Kayıtlar listeleniyor:")
        console.log(fullfilled.rows);
        jQuery.each(fullfilled.rows, function (_index, value) {
            $("#div_products").append(
                "<div class=\"card\" style=\"width: 18rem;\">" +
                "<img src=../Resources/images/" + value.product_image + " class=\"card-img-top\" width=\"100\" heigth=\"100\" >" +
                "<div class=\"card-body\">" +
                "<h5 class=\"card-title\">" + value.product_name + "  " + value.product_model + "</h5>" +
                "<p class=\"card-text\">" + value.product_text + "</p>" +
                "<p class=\"card-text\"><strong>" + value.product_price + " TL</strong></p>" +
                '<input type="submit" id="product_info_id"  value="Detaylı Bilgi"  onclick="productIdRead(' + value.product_id + ')"/>' +
                "</div>" +
                "</div>");
        });
    }).catch(rejected => {
        console.log("Kayıt Yok.")
        console.log("Hata: ", rejected);
    })
}

var productIdRead = (index) => {
    Cookies.set('product_info_id', index);
    window.location = 'productinfo.html';
}


//                      PRODUCTINFO SAYFASI FONKSİYONLARI
//                      PRODUCTINFO SAYFASI FONKSİYONLARI
//                      PRODUCTINFO SAYFASI FONKSİYONLARI

//sayfada ürünü listeleme yarar.
var productSingleRead = () => {
    var index = Cookies.get('product_info_id');
    ProductService._productSingleRead(index).then(fullfilled => {
        console.log("Kayıtlar listeleniyor:");
        console.log(fullfilled.rows);
        $("#div_product_info").empty();
        jQuery.each(fullfilled.rows, function (_index, value) {
            //div_product_info divine ürün bilgilerini ekler.
            var product_info = "";
            product_info += '<div class="row"> <div class="col-xs-4 item-photo">';
            product_info += '<img style="max-width:100%;" src="../Resources/images/' + value.product_image + '" /> </div>';
            product_info += '<div class="col-xs-5" style="border:0px solid gray"> <h3>' + value.product_name + "  " + value.product_model + '</h3>';
            product_info += '<h5 style="margin-top:0px;">' + value.product_text + ' </h5>';
            product_info += '<h3 style="margin-top:0px;">' + value.product_price + ' TL</h3>';
            product_info += '<h5 style="margin-top:0px;"><small>Lüften Adeti Giriniz</small>  </h5>';
            product_info += '<input id="adet_arttir" onclick="productIncrease()" class="btn_urun_adet" type="submit" value="+" />' +
                '<input id="adet_text" class=btn_urun_adet" disabled style="width:30px;" type="text" value="1" />' +
                '<input id="adet_azalt" onclick="productReduction()" class="btn_urun_adet" type="submit" value="-" />';
            product_info += '<div class="section" style="padding-bottom:20px;">' +
                '<button id="btn_s_product_sepete_ekle" onclick="shoppingCardInsertControl()" class="btn btn-success"><span style="margin-right:20px"' +
                'class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Sepete Ekle </button> <br><br><br><br> ';
            product_info += '<button id="btn_s_product_urun_sil" onclick="productDelete()"  class="btn btn-success" style="margin-top:10px; width:140px; background-color: salmon;">Ürün Sil </button> <br> ';
            product_info += '<button id="btn_s_product_urun_duzenle" onclick="productUpdateTextWrite()" class="btn btn-success" style="margin-top:10px; width:140px; background-color: skyblue;">Ürün Düzenle </button> <br> </button> </div> </div> </div>';
            Cookies.set('adet', 1);
            $("#div_product_info").append(product_info);
            var adet = parseInt($("#adet_text").val());
            Cookies.set('adet', adet);
            Cookies.set('product_info_price', value.product_price);
        });
    }).catch(rejected => {
        console.log("kayıt yok")
        console.log("Hata: ", rejected);
    })
}

//createShoppingCardTable oluşturulmasına yarar.
var createShoppingCardTable = () => {
    ShoppingCardService._createShoppingCardTable().then(fullfilled => {
        console.log("tablo eklendi");
        console.log(fullfilled);
    }).catch((rejected) => {
        console.log(rejected);
    })
}

//ürün adeti arrtırmaya yarar
var productIncrease = () => {
    var adet = parseInt(Cookies.get('adet'));
    adet += 1;
    $("#adet_text").val(adet);
    Cookies.set('adet', adet);
}

//sayfada ürün adeti azaltmaya yarar
var productReduction = () => {
    var adet = parseInt(Cookies.get('adet'));
    adet -= 1;
    if (adet < 1) {
        adet = 1;
        Cookies.set('adet', adet);
    } else {
        $("#adet_text").val(adet);
        Cookies.set('adet', adet);
    }
}

//products tablosundan ürün silmeye yarar.
var productDelete = () => {
    var index = Cookies.get('product_info_id');
    ProductService._productDelete(index).then(fullfilled => {
        alert("ürün başarı ile silindi.");
        console.log("Kayıtlar listeleniyor:");
        console.log(fullfilled.rows);
        window.location = 'homePage.html';
    }).catch(rejected => {
        console.log("Hata: ", rejected);
    })
}


//porducts tablosundan ürün güncellemeye yarayan textlere ürün bilgilerini çeker
var productUpdateTextWrite = () => {
    var index = Cookies.get('product_info_id');
    $("#div_product_update").show();
    textNumberControl();
    ProductService._productUpdateTextWrite(index).then(fullfilled => {
        console.log("kayıtlar getiriliyor.");
        console.log(fullfilled);
        jQuery.each(fullfilled.rows, function (_index, value) {
            $("#txt_product_Name_s").val(value.product_name);
            $("#txt_product_Model_s").val(value.product_model);
            $("#txt_product_Text_s").val(value.product_text);
            $("#txt_product_Price_s").val(value.product_price);
        });
    }).catch(rejected => {
        console.log(rejected);
    })
}

//product tablosunda ürün güncellemeye yarar.
var productUpdate = () => {
    var index = Cookies.get('product_info_id');
    var productName = $("#txt_product_Name_s").val();
    var productModel = $("#txt_product_Model_s").val();
    var productText = $("#txt_product_Text_s").val();
    var productPrice = parseInt($("#txt_product_Price_s").val());
    ProductService._productUpdate(productName, productModel, productText, productPrice, index).then(fullfilled => {
        alert("ürün başarı ile düzenlendi");
        console.log("ürün düzenleniyor.")
        console.log(fullfilled);
        window.location.href = 'productinfo.html';
    }).catch(rejected => {
        console.log(rejected);
    })
}

//sepete ekle butonuna tıklandığında çalışır
var shoppingCardInsertControl = () => {
    var index = Cookies.get('product_info_id');
    var user_name = Cookies.get('sys_nickname');
    ShoppingCardService._shoppingCardInsertControl(user_name).then(fullfilled => {
        var sepet_urunkontrol = false;
        console.log("Kayıtlar listeleniyor:");
        console.log(fullfilled.rows);
        if (fullfilled.rows.length == 0) {
            shoppingCardInsert();
        }
        jQuery.each(fullfilled.rows, function (_index, value) {
            if (parseInt(index) === value.product_id) {
                sepet_urunkontrol = true; //evet var
            } //sepette eklenecek ürün var mı ?
        })
        if (sepet_urunkontrol !== true) //eğer ürün yoksa
            shoppingCardInsert();
        else {
            shoppingCardUpdate();
            alert("sepette ürün bulunmaktadır. adet güncellemesi yapılmıştır.");
        }
    }).catch(rejected => {
        console.log("Hata: ", rejected);
    })
}

//shoppingCardInsertControl fonksiyonundan çağırılır. 
var shoppingCardInsert = () => {
    var shoppingcardName = Cookies.get('sys_nickname');
    var productId = parseInt(Cookies.get('product_info_id'));
    var userNickname = Cookies.get('sys_nickname');
    var productNumber = parseInt(Cookies.get('adet'));
    var productPrice = parseInt(Cookies.get('product_info_price'));
    ShoppingCardService._shoppingCardInsert(shoppingcardName, productId, userNickname, productNumber, productPrice).then(fullfilled => {
        console.log("kayıt eklendi");
        console.log(fullfilled);
        alert("ürün başarı ile sepete eklendi");
        window.location.href = 'shoppingCard.html';
    }).catch(rejected => {
        console.log("Hata: ", rejected);
    })
}

//sepette olan ürünün adetini güncellemeye yarar.
var shoppingCardUpdate = () => {
    var userNickname = Cookies.get('sys_nickname');
    var productId = parseInt(Cookies.get('product_info_id'));
    ShoppingCardService._shoppingCardUpdate(userNickname, productId).then(fullfilled => {
        console.log("kayıt düzenlendi");
        console.log(fullfilled.rows);
        window.location.href = 'shoppingCard.html';
    }).catch(rejected => {
        console.log("kayıt Yok")
        console.log("Hata: ", rejected);
    })
}


//                      SHOPPINGCARD SAYFASI FONKSİYONLARI
//                      SHOPPINGCARD SAYFASI FONKSİYONLARI
//                      SHOPPINGCARD SAYFASI FONKSİYONLARI


//shoppingCard sayfasında ürünleri listelemeye yarar
var shoppingCardList = () => {
    var userNickname = Cookies.get('sys_nickname');
    var genelToplam = 0;
    ShoppingCardService._shoppingCardList(userNickname).then(fullfilled => {
        console.log("Kayıtlar listeleniyor:");
        console.log(fullfilled);
        jQuery.each(fullfilled.rows, function (_index, value) {
            var productId = value.product_id;
            ShoppingCardService._getWithProductId(productId).then(fullfilled => {
                let productData = fullfilled.rows[0];
                console.log("product", productData);
                var tbody_sepet_ekle = "";
                tbody_sepet_ekle += '<tr>' +
                    '<td class="col-sm-8 col-md-6">' +
                    '<div class="media">' +
                    '<a class="thumbnail pull-left"> <img class="media-object" src="../Resources/images/' + productData.product_image + '"style="width: 72px; height: 72px;"> </a>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading"><a href="#">' + productData.product_name + " " + productData.product_model + '</a></h4>' +
                    '</div></div></td>' +
                    '<td class="col-sm-1 col-md-1" style="text-align: center">' +
                    '<input type="text" disabled style="width:45px" class="form-control" id="exampleInputEmail1" value="' + value.product_number + '">' +
                    '</td>' +
                    '<td class="col-sm-1 col-md-1 text-center"><strong>' + productData.product_price + ' TL</strong></td>' +
                    '<td class="col-sm-1 col-md-1 text-center"><strong>' + value.product_number * productData.product_price + ' TL</strong></td>' +
                    '<td class="col-sm-1 col-md-1">' +
                    '<button id="sepetten_kaldir" onclick="shoppingCardProductDelete(' + value.product_id + ')"  class="btn btn-danger">' +
                    '<span class="glyphicon glyphicon-remove"></span> Sepetten Kaldır' +
                    '</button></td>' +
                    '</tr>';
                $("#table_urunler tbody").append(tbody_sepet_ekle);
                var toplam = value.product_number * productData.product_price;
                genelToplam += toplam;
                Cookies.set('odenecek_tutar', genelToplam);
                $("#toplam_fiyat").val(genelToplam);
            }).catch(rejected => {
                console.log(new Error(rejected));
            })

        });
    }).catch(rejected => {
        console.log("kayıt Yok")
        console.log("Hata: ", rejected);

    })
    var tbody_sepet_sonu = "";
    tbody_sepet_sonu += '<tr><td></td><td></td><td></td>';
    tbody_sepet_sonu += '<td><h3>Toplam Tutar</h3></td>';
    tbody_sepet_sonu += '<td class="text-right"><h3><strong><input type="text" style="width:70px;" disabled  id="toplam_fiyat">TL</strong></h3></td></tr>';
    tbody_sepet_sonu += '<tr><td></td> <td></td> <td></td>';
    tbody_sepet_sonu += '<td><button type="button" onclick="window.location.href=\'homepage.html\'" class="btn btn-default">';
    tbody_sepet_sonu += '<span class="glyphicon glyphicon-shopping-cart"></span> Alışverişe Devam Et</button></td>';
    tbody_sepet_sonu += '<td><button id="btn_payment" onclick="window.location.href=\'payment.html\'" type="button" class="btn btn-success"> Ödeme Yap <span class="glyphicon glyphicon-play"></span></button></td></tr>';
    $("#table_butonlar tbody").append(tbody_sepet_sonu);
}

// shoppingCard v-tablosundan eleman silmeye yarar
var shoppingCardProductDelete = (index) => {
    ShoppingCardService._shoppingCardProductDelete(index).then(fullfilled => {
        console.log("Kayıtlar listeleniyor:");
        console.log(fullfilled.rows);
        window.location.href = 'shoppingCard.html';
    }).catch(rejected => {
        console.log("Tablo Yok")
        console.log("Hata: ", rejected);
    })
}


//                      PAYMENT SAYFASI FONKSİYONLARI
//                      PAYMENT SAYFASI FONKSİYONLARI
//                      PAYMENT SAYFASI FONKSİYONLARI

//ödeme sayfası içerisnde toplam fiyatı yazmasını sağlar.
var paymentPriceText = () => {
    var odenecek_tutar = Cookies.get('odenecek_tutar');
    $("#toplam_odenecek_ucret").val(odenecek_tutar);
}

//ödeme yapılan sepeti temizlemek için kullanılır.
var shoppingCardClear = () => {
    var userNickname = Cookies.get('sys_nickname');
    ShoppingCardService._shoppingCardClear(userNickname).then(fullfilled => {
        console.log("tablo temizleniyor:");
        console.log(fullfilled.rows);
        alert("ödeme başarı ile gerçekleşti");
        Cookies.set('odenecek_tutar', 0);

        window.location.href = 'homePage.html';

    }).catch(rejected => {
        console.log("Hata: ", rejected);
    })
}