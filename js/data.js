// 載資料
fetch('data.json').then(function (response) {

    return response.json();

}).then(function (res) {

    let outListInner = document.getElementById('outListInner');
    showData(res.data);
});

// $.ajax({
//     url: 'data.json',
//     dataType: 'json',
//     success: function(dataAll){
//         console.log(dataAll)
//     }
// });

// fetch('data.json',{})
//     .then((response) => {
//         return response.json();
//     }).then((jsonData) => {
//         console.log(jsonData)
//     });


// 刷新-----------------------------------
function showData(data) {
    let groupListAll = '';
    let html_item = '';
    data.forEach(function (e, index) {
        e.groupDetail.forEach(function (element, key) {
            let checked = (data[index].groupDetail[key].operating === true) ? 'checked' : '';
            // 資料---->其他也需要改: other.js-資料裡面刷新。
            html_item += '\
                <tr id="tr'+ index + '_' + key + '" class="kanban-card" data-i="' + index + '">\
                    <td>\
                        <input type="checkbox" id="squaredInner'+ index + '_' + key + '" name="groupChecked' + index + '[]" />\
                        <label for="squaredInner' + index + '_' + key + '"></label>\
                    </td>\
                    <th id="el'+ index + '_' + key + '_1">' + element.priority + '</th>\
                    <th id="el'+ index + '_' + key + '_2">' + element.name + '</th>\
                    <th id="el'+ index + '_' + key + '_3">' + element.source + '</th>\
                    <th id="el'+ index + '_' + key + '_4">' + element.source_port + '</th>\
                    <th id="el'+ index + '_' + key + '_5">' + element.source_ip + '</th>\
                    <th id="el'+ index + '_' + key + '_6">' + element.destination + '</th>\
                    <th id="el'+ index + '_' + key + '_7">' + element.destination_port + '</th>\
                    <th id="el'+ index + '_' + key + '_8">' + element.destination_ip + '</th>\
                    <th id="el'+ index + '_' + key + '_9">' + element.protocol + '</th>\
                    <td class="tbody-checkbox2">\
                        <div class="onoffswitch">\
                            <input type="checkbox" name="groupCheckedSwitch' + index + '[]" class="onoffswitch-checkbox" id="myonoffswitch' + index + '_' + key + '" ' + checked + '>\
                            <label class="onoffswitch-label" for="myonoffswitch' + index + '_' + key + '">\
                                <span class="onoffswitch-inner"></span>\
                                <span class="onoffswitch-switch"></span>\
                            </label>\
                        </div>\
                    </td>\
                    <td class="edit">\
                        <a href="javascript:void(0)" onclick="edit_cancel($(this))" data-i=' + index + ' data-k=' + key + ' data-v1=' + element.priority + ' data-v2=' + element.name + ' data-v3=' + element.source + ' data-v4=' + element.source_port + ' data-v5=' + element.source_ip + ' data-v6=' + element.destination + ' data-v7=' + element.destination_port + ' data-v8=' + element.destination_ip + ' data-v9=' + element.protocol + ' id="editCancel' + index + '_' + key + '" class="item"><i class="fas fa-times"></i></a>\
                        <a href="javascript:void(0)" onclick="edit_check($(this))" data-i=' + index + ' data-k=' + key + ' id="editCheck' + index + '_' + key + '" class="item"><i class="fas fa-check"></i></a>\
                        <a href="javascript:void(0)" onclick="edit_editBtn($(this))" data-i=' + index + ' data-k=' + key + ' id="editG' + index + '_' + key + '" class="list_editBtn"><i class="far fa-edit"></i></a>\
                    </td>\
                </tr>'
        });

        if (e.group == "") {
            let noGroupTit = document.getElementById('noGroupTit');
            let noGroupList = '\
            <tr>\
                <th class="thead-svg">\
                    <input type="checkbox" value="None" id="squaredOut" onclick="check_all(this.checked,\'groupChecked' + index + '[]\')" />\
                    <label for="squaredOut"></label>\
                </th>\
                <th class="thead-sort"><button type="button" class="sort" id="sort' + index + '"><i class="fas fa-sort-alpha-down" onclick="sort_func1(table_out,$(this),outListInner)" data-i=' + index + '></i><i class="fas fa-sort-alpha-down-alt" onclick="sort_func2(table_out,$(this),outListInner)" data-i=' + index + '></i></button></th>\
                <th>Name</th>\
                <th>Source</th>\
                <th class="titWidth">Source Port</th>\
                <th class="titWidth">Source IP</th>\
                <th>Destination</th>\
                <th class="titWidth2">Destination Port</th>\
                <th class="titWidth">Destination IP</th>\
                <th>Protocol</th>\
                <th class="thead-checkbox2">\
                    <div class="onoffswitch">\
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" onclick="check_all(this.checked,`groupCheckedSwitch' + index + '[]`)" id="myonoffswitch-out' + index + '" >\
                        <label class="onoffswitch-label" for="myonoffswitch-out' + index + '">\
                            <span class="onoffswitch-inner"></span>\
                            <span class="onoffswitch-switch"></span>\
                        </label>\
                    </div>\
                </th>\
                <th></th>\
            </tr>';
            noGroupTit.innerHTML = noGroupList;
            outListInner.innerHTML = html_item;

            document.getElementById('noGroupTit').setAttribute('data-i', index);

        } else {
            let itemLength = e.groupDetail.length;
            // 載資料-有群組
            let card = document.getElementById('card-454267');
            // 群組 list 資料的標題
            let groupList = '<div class="list" data-i=' + index + '>\
            <div class="card-link" data-toggle="collapse" onclick="changeListColor(this)" href="#card-element' + index + '" aria-expanded="true">\
                <i class="fas fa-chevron-right"></i>\
                <p>\
                    <span class="groupName" id="groupNameId' + index + '">' + e.group + '</span>-\
                    <span class="groupCaption" id="groupCaptionId' + index + '">' + e.caption + '</span>\
                    (<span id="groupInnerLen' + index + '">' + itemLength + '</span>)\
                </p>\
                <div class="groupItem">\
                    <a href="javascript:void(0)" onclick="list_cancel($(this))" data-caption=' + e.caption + ' data-groupn=' + e.group + ' data-i=' + index + ' id="itemCancel' + index + '" class="item"><i class="fas fa-times"></i></a>\
                    <a href="javascript:void(0)" onclick="list_check($(this))" data-caption=' + e.caption + ' data-groupn=' + e.group + ' data-i=' + index + ' id="itemCheck' + index + '" class="item"><i class="fas fa-check"></i></a>\
                    <a href="javascript:void(0)" onclick="list_editBtn($(this))" data-caption=' + e.caption + ' data-groupn=' + e.group + ' data-i=' + index + ' id="itemEdit' + index + '" class="list_editBtn"><i class="far fa-edit"></i></a>\
                </div>\
            </div>\
                <div id="card-element' + index + '" class="collapse">\
                    <div class="card-body table-responsive">\
                        <table class="table " border="0" id="table' + index + '" >\
                            <thead data-i="' + index + '">\
                                <tr>\
                                    <th class="thead-svg">\
                                        <input type="checkbox" value="None" id="squaredInner' + index + '" onclick="check_all(this.checked, \'groupChecked' + index + '[]\')" />\
                                        <label for="squaredInner' + index + '"></label>\
                                    </th>\
                                    <th class="thead-sort"><button type="button" class="sort" id="sort' + index + '"><i class="fas fa-sort-alpha-down" onclick="sort_func1(table' + index + ',$(this),tbody' + index + ')" data-i=' + index + '></i><i class="fas fa-sort-alpha-down-alt" onclick="sort_func2(table' + index + ',$(this),tbody' + index + ')" data-i=' + index + '></i></button></th>\
                                    <th>Name</th>\
                                    <th>Source</th>\
                                    <th class="titWidth">Source Port</th>\
                                    <th class="titWidth">Source IP</th>\
                                    <th>Destination</th>\
                                    <th class="titWidth2">Destination Port</th>\
                                    <th class="titWidth2">Destination IP</th>\
                                    <th>Protocol</th>\
                                    <th class="thead-checkbox2">\
                                        <div class="onoffswitch">\
                                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox " onclick="check_all(this.checked,`groupCheckedSwitch' + index + '[]`)" id="myonoffswitch' + index + '">\
                                            <label class="onoffswitch-label" for="myonoffswitch' + index + '">\
                                                <span class="onoffswitch-inner"></span>\
                                                <span class="onoffswitch-switch"></span>\
                                            </label>\
                                        </div>\
                                    </th>\
                                    <th> </th>\
                                </tr>\
                            </thead>\
                            <tbody id="tbody' + index + '">';
            let groupListEnd = '</tbody >\
                            </table >\
                        </div >\
                    </div >\
                </div > ';
            groupListAll += (groupList + html_item + groupListEnd)
            card.innerHTML = groupListAll;
        }
        html_item = '';
    });

    move()
}

// 資料刪除-----------------------------------
function trash_func1(trash) {

    //抓有勾選的資料
    //有群組
    let groupLen = $('#card-454267')[0].children.length;
    for (let a = 0; a < groupLen; a++) {
        let item = $(`#table${a}`)[0].rows;
        let az = [];
        for (let i = 1; i < item.length; i++) {
            let ifCheck = item[i].children[0].children[0].checked;
            if (ifCheck == false) {
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
        }
        tableInfo_html(az, a, `#tbody${a}`);

        $(`#squaredInner${a}`)[0].checked = false;

        //group length
        let groupNum = $(`#groupInnerLen${a}`)[0].innerText = $(`#tbody${a}`)[0].rows.length;

        if (groupNum == 0) {
            let divSpace = `<tr class="divSpace" id="divSpace${a}"><td></td><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><td></td><td></td></tr>`;
            $(`#tbody${a}`).html("").append(divSpace);
        }
    }

    //沒群組
    let groupTh = $('.out-list')[0].children[0].children[0].children[0].dataset.i
    let item = $('.out-list')[0].children[0].children[0].rows;
    let az = [];
    for (let i = 1; i < item.length; i++) {
        let ifCheck = item[i].children[0].children[0].checked;
        if (ifCheck == false) {
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
    }
    tableInfo_html(az, groupTh, '#outListInner');

    $('#squaredOut')[0].checked = false;
    let noNum = $('#noGroupTit').data("i");

    if ($('#outListInner')[0].children.length == 0) {
        let divSpace = `<tr class="divSpace"  id="divSpace${noNum}"><td></td><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><td></td><td></td></tr>`;
        $(`#outListInner`).html("").append(divSpace);
    }
}

// 新增-----------------------------------
function add(newData) {
    // 新的物件
    let addItem = {};
    addItem.priority = $('#priority').val();
    addItem.name = $('#name').val();
    addItem.source = $('#source').val();
    addItem.source_port = $('#sourcePort').val();
    addItem.source_ip = ipNo($('#sourceIpInput').val());
    addItem.destination = $('#destination').val();
    addItem.destination_port = $('#port').val();
    addItem.destination_ip = ipNo($('#destinationIpInput').val());
    addItem.protocol = $('.setupPro-active').text();
    addItem.operating = $('#myonoffswitchAdd')[0].checked;
    addItem.group = $('#group').val();
    addItem.caption = $('#description').val();

    // 必填
    if (addItem.source_port === '' || addItem.destination_port === '' || addItem.priority === '' || addItem.name === '' ||
        (addItem.source === 'ip' && addItem.source_ip === '') ||
        (addItem.destination_port === 'ip' && addItem.destination_ip === '')) {
        alert('請確實填寫必填欄位!')
    } else {

        // 原本-有群組
        let groupNumLen = $('#card-454267')[0].children.length;
        for (let a = 0; a < groupNumLen; a++) {
            let groupNum = $('#card-454267')[0].children[a].dataset.i;
            let oldGroupName = $(`#groupNameId${a}`).text();
            if (oldGroupName === addItem.group) {

                //原本的資料
                let item = $(`#table${a}`)[0].rows;
                let az = [];
                for (let a = 1; a < item.length; a++) {
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
                az.push(addItem);
                tableInfo_html(az, a, `#tbody${a}`);

                //group length
                $(`#groupInnerLen${a}`)[0].innerText = $(`#tbody${a}`)[0].rows.length;
                infoSend();
                return;
            }
        }

        // 原本-沒群組
        if (addItem.group === '') {
            //原本的資料
            let groupTh = $('.out-list')[0].children[0].children[0].children[0].dataset.i
            let item = $('#outListInner')[0].rows;
            let az = [];
            for (let a = 0; a < item.length; a++) {
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
            az.push(addItem);
            tableInfo_html(az, groupTh, `#outListInner`);
            infoSend();
            return;
        }

        // 新增群組
        else {
            //新資料----console.log(addItem)
            let newGroup = {};
            newGroup.caption = addItem.caption;
            newGroup.group = addItem.group;
            newGroup.groupDetail = [];
            newGroup.groupDetail.push(addItem);

            let newGroupNum = $('#card-454267')[0].childElementCount;
            
            
            let card = document.getElementById('card-454267');
            // 群組 list 資料的標題
            let groupList = '<div class="list" data-i=' + newGroupNum + '>\
            <div class="card-link" data-toggle="collapse" onclick="changeListColor(this)" href="#card-element' + newGroupNum + '" aria-expanded="true">\
                <i class="fas fa-chevron-right"></i>\
                <p>\
                    <span class="groupName" id="groupNameId' + newGroupNum + '">' + addItem.group + '</span>-\
                    <span class="groupCaption" id="groupCaptionId' + newGroupNum + '">' + addItem.caption + '</span>\
                    (<span id="groupInnerLen' + newGroupNum + '">1</span>)\
                </p>\
                <div class="groupItem">\
                    <a href="javascript:void(0)" onclick="list_cancel($(this))" data-caption=' + addItem.caption + ' data-groupn=' + addItem.group + ' data-i=' + newGroupNum + ' id="itemCancel' + newGroupNum + '" class="item"><i class="fas fa-times"></i></a>\
                    <a href="javascript:void(0)" onclick="list_check($(this))" data-caption=' + addItem.caption + ' data-groupn=' + addItem.group + ' data-i=' + newGroupNum + ' id="itemCheck' + newGroupNum + '" class="item"><i class="fas fa-check"></i></a>\
                    <a href="javascript:void(0)" onclick="list_editBtn($(this))" data-caption=' + addItem.caption + ' data-groupn=' + addItem.group + ' data-i=' + newGroupNum + ' id="itemEdit' + newGroupNum + '" class="list_editBtn"><i class="far fa-edit"></i></a>\
                </div>\
            </div>\
                <div id="card-element' + newGroupNum + '" class="collapse">\
                    <div class="card-body table-responsive">\
                        <table class="table " border="0" id="table' + newGroupNum + '" >\
                            <thead data-i="' + newGroupNum + '">\
                                <tr>\
                                    <th class="thead-svg">\
                                        <input type="checkbox" value="None" id="squaredInner' + newGroupNum + '" onclick="check_all(this.checked, \'groupChecked' + newGroupNum + '[]\')" />\
                                        <label for="squaredInner' + newGroupNum + '"></label>\
                                    </th>\
                                    <th class="thead-sort"><button type="button" class="sort" id="sort' + newGroupNum + '"><i class="fas fa-sort-alpha-down" onclick="sort_func1(table' + newGroupNum + ',$(this),tbody' + newGroupNum + ')" data-i=' + newGroupNum + '></i><i class="fas fa-sort-alpha-down-alt" onclick="sort_func2(table' + newGroupNum + ',$(this),tbody' + newGroupNum + ')" data-i=' + newGroupNum + '></i></button></th>\
                                    <th>Name</th>\
                                    <th>Source</th>\
                                    <th class="titWidth">Source Port</th>\
                                    <th class="titWidth">Source IP</th>\
                                    <th>Destination</th>\
                                    <th class="titWidth2">Destination Port</th>\
                                    <th class="titWidth2">Destination IP</th>\
                                    <th>Protocol</th>\
                                    <th class="thead-checkbox2">\
                                        <div class="onoffswitch">\
                                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox " onclick="check_all(this.checked,`groupCheckedSwitch' + newGroupNum + '[]`)" id="myonoffswitch' + newGroupNum + '">\
                                            <label class="onoffswitch-label" for="myonoffswitch' + newGroupNum + '">\
                                                <span class="onoffswitch-inner"></span>\
                                                <span class="onoffswitch-switch"></span>\
                                            </label>\
                                        </div>\
                                    </th>\
                                    <th> </th>\
                                </tr>\
                            </thead>\
                            <tbody id="tbody' + newGroupNum + '" ondrop="drop(event,tbody' + newGroupNum + ')" ondragover="allowDrop(event)">\
                            </tbody >\
                            </table >\
                        </div >\
                    </div >\
                </div > ';

            card.insertAdjacentHTML('beforeend', groupList);

            tableInfo_html(newGroup.groupDetail, newGroupNum, `#tbody${newGroupNum}`);
            infoSend();
        }
    }

}

// 新增-不要出現undefined
function ipNo(ip) {
    if (!ip) {
        return '';
    } else {
        return ip;
    }
}

// 拖曳-----------------------------------
function move() {

    //抓群組名
    let groupLen = $('#card-454267')[0].children.length;
    let boxAry = [];
    let dragulaCards = dragula(boxAry);

    for (let a = 0; a < groupLen; a++) {
        let box = document.querySelector(`#tbody${a}`);
        boxAry.push(box);
    }
    boxAry.push(document.querySelector('#outListInner'))

    //完成拖拉後
    dragulaCards.on('drop', function (el, target, source, sibling) {

        let oldGroupNum = $(source).parents()[0].children[0].dataset.i;
        let newGroupNum = $(target).parents()[0].children[0].dataset.i;

        // 都移出後要有可放的空間
        if ($(source)[0].children.length == 0) {
            let idName = $(source)[0].id;
            let divSpace = `<tr class="divSpace" id="divSpace${oldGroupNum}"><td></td><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><td></td><td></td></tr>`;
            $(`#${idName}`).html("").append(divSpace);
            if ($(`#groupInnerLen${oldGroupNum}`).length > 0) {
                $(`#groupInnerLen${oldGroupNum}`)[0].innerText = 0;
            }
        } else {
            // 移出的群組刪減數量
            if ($(`#groupInnerLen${oldGroupNum}`).length > 0) {
                $(`#groupInnerLen${oldGroupNum}`)[0].innerText = parseInt($(`#groupInnerLen${oldGroupNum}`)[0].innerText) - 1;
                ui_update($(source)[0].rows, oldGroupNum, `#tbody${oldGroupNum}`, 0);
            } else {
                ui_update($(source)[0].rows, oldGroupNum, '#outListInner', 0)
            }

            // 新位置的群組增加數量
            if ($(`#groupInnerLen${newGroupNum}`).length > 0) {
                $(`#groupInnerLen${newGroupNum}`)[0].innerText = parseInt($(`#groupInnerLen${newGroupNum}`)[0].innerText) + 1;

                let row2 = $('#outListInner')[0].rows.length;
                for (let b = 0; b < row2; b++) {
                    console.log($(`#tbody${newGroupNum}`))
                    // let delName = $(`#tbody${newGroupNum}`)[0].rows[b].className;
                    // if (delName == 'divSpace') {
                    //     $(`#divSpace${newGroupNum}`).remove();
                    // }
                }
                // ui_update($(target)[0].rows, newGroupNum, `#tbody${newGroupNum}`, 0);
            } else {
                let row3 = $('#outListInner')[0].rows.length;
                for (let b = 0; b < row3; b++) {
                    // let delName = $('#outListInner')[0].rows[b].className;

                    // if (delName == 'divSpace') {
                    //     $(`#divSpace${newGroupNum}`).remove();
                    // }
                }
                // ui_update($(target)[0].rows, newGroupNum, '#outListInner', 0);
            }
        }
    });

    let dragulaKanban = dragula([
        document.querySelector('#kanban')
    ], {
        moves: function (el, container, handle) {
            return;
        }
    });
}

// 送出-----------------------------------
function apply() {
    let all = { "data": [] };

    // 群組資料
    let groupLen = $('#card-454267')[0].children.length;

    for (let g = 0; g < groupLen; g++) {
        let groupText = $(`#groupNameId${g}`).text();
        let captionText = $(`#groupCaptionId${g}`).text();
        let id = $(`#tbody${g}`)[0];
        info(groupText, captionText, id, all);
    }

    // 沒群組
    let groupText = "";
    let captionText = "";
    let id = $('#outListInner')[0];
    info(groupText, captionText, id, all);

    //資料格式要表單
    $.ajax({
        url: 'apply.php',
        type: 'post',
        data: all,
        error: function () {
            alert('error');
        },
        success: function (data) {
            alert(data);
        }
    });
    // all.data.join('&')
    // console.log(all.data)
    // 送資料
    // let xhr = new XMLHttpRequest();
    // xhr.open("post", "apply.php", true);
    // // xhr.setRequestHeader("Content-type", "multipart/form-data");
    // // all = JSON.stringify(all);
    // // console.log(all);
    // xhr.send(new FormData(all));


}

function info(groupText, captionText, id, all) {
    let groupIfo = {}
    groupIfo.group = groupText;
    groupIfo.caption = captionText;

    let item = id.rows;
    let az = [];
    for (let i = 0; i < item.length; i++) {
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
    groupIfo.groupDetail = az;
    all.data.push(groupIfo);
}
