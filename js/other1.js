// 會員名稱修改
$('#inputBox').dblclick(function () {
    document.getElementById('member').disabled = false;
});
$('#member').blur(function (e) {
    document.getElementById('member').disabled = "disabled";
});

// list點擊換色
function changeListColor(objColor) {
    $(objColor).toggleClass('card-link-active');
}

// 群組標題-按下編輯後可以改群組名稱和描述
function list_editBtn(thisBtn) {
    event.stopPropagation();
    // 2個按鈕
    $("#itemCancel" + thisBtn.data("i")).css('display', 'inline-block');
    $("#itemCheck" + thisBtn.data("i")).css('display', 'inline-block');
    $("#itemEdit" + thisBtn.data("i")).css('display', 'none');

    // 換成新的編輯
    let value1;  // 重要
    let value2;  // 重要

    if ($("input[name='groupName" + thisBtn.data("i") + "']").length > 0) {
        value1 = $("input[name='groupName" + thisBtn.data("i") + "']").val();
        value2 = $("input[name='groupCaption" + thisBtn.data("i") + "']").val();
    } else {  //span
        value1 = $("#groupNameId" + thisBtn.data("i")).text();
        value2 = $("#groupCaptionId" + thisBtn.data("i")).text();
    }

    groupNameInput = '<input type="text" name="groupName' + thisBtn.data("i") + '" value="' + value1 + '"/>';
    groupCaptionInput = '<input type="text" name="groupCaption' + thisBtn.data("i") + '" value="' + value2 + '"/>';

    // 停止下拉
    $("#groupNameId" + thisBtn.data("i")).click(function (event) {
        event.stopPropagation();
    });
    $("#groupCaptionId" + thisBtn.data("i")).click(function (event) {
        event.stopPropagation();
    });

    // 輸入框
    $("#groupNameId" + thisBtn.data("i")).html('').append(groupNameInput);
    $("#groupCaptionId" + thisBtn.data("i")).html('').append(groupCaptionInput);

}

// 群組標題-確認送出
function list_check(checkBtn) {
    event.stopPropagation();
    let value1 = $("input[name='groupName" + checkBtn.data("i") + "']").val(); // 重點
    let value2 = $("input[name='groupCaption" + checkBtn.data("i") + "']").val(); // 重點

    $("#groupNameId" + checkBtn.data("i")).html('').html(value1);
    $("#groupCaptionId" + checkBtn.data("i")).html('').html(value2);

    // 2個按鈕
    $("#itemCancel" + checkBtn.data("i")).css('display', 'none');
    $("#itemCheck" + checkBtn.data("i")).css('display', 'none');
    $("#itemEdit" + checkBtn.data("i")).css('display', 'block');
}

// 群組標題-還原
function list_cancel(cancelBtn) {
    event.stopPropagation();

    let oldName = cancelBtn.data("groupn"); // 重點
    let oldCaption = cancelBtn.data("caption"); // 重點
    let newG = '<span class="groupName" id="groupNameId' + cancelBtn.data("i") + '">' + oldName + '</span>';
    let newC = '<span class="groupCaption" id="groupCaptionId' + cancelBtn.data("i") + '">' + oldCaption + '</span>';

    $("#groupNameId" + cancelBtn.data("i")).html('').append(newG);
    $("#groupCaptionId" + cancelBtn.data("i")).html('').append(newC);

    // 2個按鈕
    $("#itemCancel" + cancelBtn.data("i")).css('display', 'none');
    $("#itemCheck" + cancelBtn.data("i")).css('display', 'none');
    $("#itemEdit" + cancelBtn.data("i")).css('display', 'block');
}

// square-checked、allCheck_sec 全部選取
function check_all(status, groupCheckedName) {
    let checkboxes = document.getElementsByName(groupCheckedName);
    checkboxes.forEach(function (e) {
        e.checked = status;
    });
}

// 資料編輯-----------------------------------
function edit_editBtn(editBtn) {
    $(`#editG${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'none');
    $(`#editCancel${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'block');
    $(`#editCheck${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'block');

    for (let a = 1; a < 10; a++) {
        edit_editBtn2(editBtn, a)
    };
}
function edit_editBtn2(editBtn, num) {
    let val_original;
    val_original = $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num}`).text();

    edit_val = `<input type="text" name="editItem${editBtn.data("i")}_${editBtn.data("k")}_${num}" value="${val_original}"/>`;
    // event.stopPropagation();

    $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num}`).html(edit_val);
    $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num} input`).css('width', '100px');
}

// 資料編輯-確認----------------------------------
function edit_check(editBtn) {
    $(`#editG${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'block');
    $(`#editCancel${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'none');
    $(`#editCheck${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'none');

    //新的值
    for (let a = 1; a < 10; a++) {
        edit_check2(editBtn, a)
    }
}
function edit_check2(editBtn, num) {
    let newVal = $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num} input`).val()
    $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num}`).text(newVal);

    //把新的值設定屬性data在x上面---js和jq特性不同!!
    // console.log(  , '. set .', `v${num}`);
    $(`#editCancel${editBtn.data("i")}_${editBtn.data("k")}`).data(`v${num}`, newVal);
}

// 資料編輯-還原----------------------------------
function edit_cancel(editBtn) {
    $(`#editG${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'block');
    $(`#editCancel${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'none');
    $(`#editCheck${editBtn.data("i")}_${editBtn.data("k")}`).css('display', 'none');

    for (let a = 1; a < 10; a++) {
        edit_cancel2(editBtn, a)
    }
}
function edit_cancel2(editBtn, num) {
    let oldVal = editBtn.data(`v${num}`);
    // console.log(oldVal,'...',`v${num}`)
    $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num} input`).remove();
    $(`#el${editBtn.data("i")}_${editBtn.data("k")}_${num}`).text(oldVal);
}

// 抓那群組的ui資料
function ui_update(item, GroupNum, tbodyName, startNum){
    let az = [];
    for (let a = startNum; a < item.length; a++) {
        let ob = {};
        ob.priority = item[a].children[1].innerText;
        ob.name = item[a].children[2].innerText;
        ob.source = item[a].children[3].innerText;
        ob.source_port = item[a].children[4].innerText;
        ob.source_ip = item[a].children[5].innerText;
        ob.destination = item[a].children[6].innerText;
        ob.destination_port = item[a].children[7].innerText;
        ob.destination_ip = item[a].children[8].innerText;
        ob.protocol = item[a].children[9].innerText;
        ob.operating = item[a].children[10].children[0].children[0].checked;
        az.push(ob);
    }
    tableInfo_html(az, GroupNum, tbodyName);
}

//資料裡面刷新----------------------------------
function tableInfo_html(az, groupNum, tbodyName) {
    let sort_html;
    az.forEach(function (e, key) {
        let checked = (e.operating === true) ? 'checked' : '';
        sort_html += '\
        <tr id="tr'+ groupNum + '_' + key + '"  class="kanban-card">\
                    <td>\
                        <input type="checkbox" id="squaredInner'+ groupNum + '_' + key + '" name="groupChecked' + groupNum + '[]" />\
                        <label for="squaredInner' + groupNum + '_' + key + '"></label>\
                    </td>\
                    <th id="el'+ groupNum + '_' + key + '_1">' + e.priority + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_2">' + e.name + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_3">' + e.source + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_4">' + e.source_port + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_5">' + e.source_ip + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_6">' + e.destination + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_7">' + e.destination_port + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_8">' + e.destination_ip + '</th>\
                    <th id="el'+ groupNum + '_' + key + '_9">' + e.protocol + '</th>\
                    <td class="tbody-checkbox2">\
                        <div class="onoffswitch">\
                            <input type="checkbox" name="groupCheckedSwitch' + groupNum + '[]" class="onoffswitch-checkbox" id="myonoffswitch' + groupNum + '_' + key + '" ' + checked + '>\
                            <label class="onoffswitch-label" for="myonoffswitch' + groupNum + '_' + key + '">\
                                <span class="onoffswitch-inner"></span>\
                                <span class="onoffswitch-switch"></span>\
                            </label>\
                        </div>\
                    </td>\
                    <td class="edit">\
                        <a href="javascript:void(0)" onclick="edit_cancel($(this))" data-i=' + groupNum + ' data-k=' + key + ' data-v1=' + e.priority + ' data-v2=' + e.name + ' data-v3=' + e.source + ' data-v4=' + e.source_port + ' data-v5=' + e.source_ip + ' data-v6=' + e.destination + ' data-v7=' + e.destination_port + ' data-v8=' + e.destination_ip + ' data-v9=' + e.protocol + ' id="editCancel' + groupNum + '_' + key + '" class="item"><i class="fas fa-times"></i></a>\
                        <a href="javascript:void(0)" onclick="edit_check($(this))" data-i=' + groupNum + ' data-k=' + key + ' id="editCheck' + groupNum + '_' + key + '" class="item"><i class="fas fa-check"></i></a>\
                        <a href="javascript:void(0)" onclick="edit_editBtn($(this))" data-i=' + groupNum + ' data-k=' + key + ' id="editG' + groupNum + '_' + key + '" class="list_editBtn"><i class="far fa-edit"></i></a>\
                    </td>\
                </tr>'
    });
    $(tbodyName).html("").append(sort_html);
}

// 排序----------------------------------
function sort_func1(tableName, groupNum, tbodyName) {
    $(`#sort${groupNum.data("i")} .fa-sort-alpha-down`).css('display', 'none');
    $(`#sort${groupNum.data("i")} .fa-sort-alpha-down-alt`).css('display', 'block');

    // console.log(tableName.rows); //重要
    let item = tableName.rows;
    let az = [];
    for (let i = 1; i < item.length; i++) {
        let ob = {};
        ob.priority = item[i].children[1].innerText;
        ob.name = item[i].children[2].innerText;
        ob.source = item[i].children[3].innerText;
        ob.source_port = item[i].children[4].innerText;
        ob.source_ip = item[i].children[5].innerText;
        ob.destination = item[i].children[6].innerText;
        ob.destination_port = item[i].children[7].innerText;
        ob.destination_ip = item[i].children[8].innerText;
        ob.protocol = item[i].children[9].innerText;
        ob.operating = item[i].children[10].children[0].children[0].checked;
        az.push(ob)
    }
    az.sort((a, b) => b.priority - a.priority);
    tableInfo_html(az, groupNum.data("i"), tbodyName);
}
function sort_func2(tableName, groupNum, tbodyName) {
    $(`#sort${groupNum.data("i")} .fa-sort-alpha-down`).css('display', 'block');
    $(`#sort${groupNum.data("i")} .fa-sort-alpha-down-alt`).css('display', 'none');

    let item = tableName.rows;
    let az = [];
    for (let i = 1; i < item.length; i++) {
        let ob = {};
        ob.priority = item[i].children[1].innerText;
        ob.name = item[i].children[2].innerText;
        ob.source = item[i].children[3].innerText;
        ob.source_port = item[i].children[4].innerText;
        ob.source_ip = item[i].children[5].innerText;
        ob.destination = item[i].children[6].innerText;
        ob.destination_port = item[i].children[7].innerText;
        ob.destination_ip = item[i].children[8].innerText;
        ob.protocol = item[i].children[9].innerText;
        ob.operating = item[i].children[10].children[0].children[0].checked;
        az.push(ob)
    }
    az.sort(function (a, b) {
        return a.priority - b.priority;
    });
    
    tableInfo_html(az, groupNum.data("i"), tbodyName);
}