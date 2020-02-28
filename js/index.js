
function login(){
  var email = $('input[type=email]').val();
  var password = $('input[type=password]').val();
  if((email === '') || (password === '')){
    alert('請正確填寫資料');
  }else{
    window.location.href = "table.html";
  }
}
