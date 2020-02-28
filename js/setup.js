// setup 小圖展開縮放
$('.add').click(function () {
  $('.addSetup').toggleClass('addSetupNew');
  $('.add').toggleClass('addNew');
  $('.addSetupBg').toggleClass('addSetupBgNew');
});

// setup protocol active
$('#protocol a').click(function () {
  $('#protocol a').removeClass('setupPro-active');
  $(this).addClass('setupPro-active');
});

//setup送出顯示
function infoSend(){
    alert("資料已送出");
    clear_setup()
}

// clear setup form
function clear_setup(){
    $('#sourcePort').val("");
    $('#port').val("");
    $('#priority').val("");
    $('#name').val("");
    $('#group').val("");
    $('#description').val("");

    $('#protocol a').removeClass('setupPro-active');
    $('#protocol a:eq(0)').addClass('setupPro-active');

}


// setup 裡ip點了新增input
var source = document.getElementById('source');
var destination = document.getElementById('destination');

source.addEventListener('change', function (e) {
    let select = e.target.value;
    let sourceIpHtml = '\
        <div class="form-item" >\
    <label for="sourcePort">*Source IP</label>\
    <input type="text" name="sourcePort" id="sourceIpInput">\
        </div>';

    let sourceIp = document.getElementById('sourceIp');
    if (select === 'ip') {
        sourceIp.innerHTML = sourceIpHtml;
    } else {
        sourceIp.innerHTML = '';
    };
});

destination.addEventListener('change', function (e) {
    let select = e.target.value;
    let destinationIpHtml = '\
        <div class="form-item" >\
    <label for="destination_ip">*Destination IP</label>\
    <input type="text" name="destination_ip" id="destinationIpInput">\
        </div>';

    let destinationIp = document.getElementById('destinationIp');
    if (select === 'ip') {
        destinationIp.innerHTML = destinationIpHtml;
    } else {
        destinationIp.innerHTML = '';
    };
});
