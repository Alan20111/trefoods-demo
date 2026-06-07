const base_url = "";

loginUser();
function loginUser() {
    var usuario = localStorage.getItem('usuario');
    var contrasena = localStorage.getItem('contrasena');

    var jsonLogin = {
        usuario: usuario,
        contrasena: contrasena
    }
    checkLogin(jsonLogin);
}
function checkLogin(jsonLogin) {
    $.ajax({
        url: base_url + "index.php/Admin/login",
        dataType: "json",
        type: "post",
        data: jsonLogin,
        success: function (datos, estado, jhrx) {
            if (datos.Status == "False") {
                localStorage.clear();
                window.location.href = "index.html";
            } else {
            }
        },
        error: function (jhrx, estado, errorA) {
        }
    })
}
function close_session() {
    localStorage.clear();
    window.location.href = "index.html";
}