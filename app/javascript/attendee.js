// 大まかな流れ
// セレクトボックスの値から、idと名前をもってきて、クリックできるdivをつくる
// クリックすると、idをinputに追加する
// 同時に、表示用のdivにも名前とを追加する
// 検索用のボックスを作成して、そこの入力を検知
// 入力された値により、セレクトボックスの値を検索してクリックできるdivを再生成
// 編集時には、セレクトされている状態にする

window.addEventListener('load', function() {
  const selectableOptions = document.getElementById("selectable-options")
  
  function addSelectableOptions(keyword){//選択肢を追加する関数
    while(selectableOptions.firstChild){
      selectableOptions.removeChild(selectableOptions.firstChild);
    }
    let opsions = document.getElementById("select").children
    let attendees_field = document.getElementById("attendees")
  
    for(let i=0; i < opsions.length; i++){
      let append_selectable_option
      append_selectable_option =  document.createElement("div")
      append_selectable_option.innerHTML = opsions[i].innerHTML //名前を要素に追加
      append_selectable_option.setAttribute('data-id', opsions[i].value)//IDをdata属性に追加

      append_selectable_option.onclick = function() {//クリックしたときに動く関数
        let selected_member_id = append_selectable_option.getAttribute('data-id')
        let selected_member_name = append_selectable_option.innerHTML
        if (append_selectable_option.classList.contains("is_selected")){//is_selectedが含まれていたら

          let selected_options_arry = attendees_field.value.split(",")// 選択されているIDを配列に入れて
          let removed_arry =  selected_options_arry.filter(e =>{
            return Number(e) != Number(selected_member_id)
          })//配列の中から自身のIDを削除
          attendees_field.value = removed_arry.join(",")// inputに追加

          let selected_names_arry = selected_member_names.innerHTML.split(",")// 選択されている名前を配列に入れて
          let removed_names_arry =  selected_names_arry.filter(e =>{
            return e != selected_member_name
          })//配列の中から自身の名前を削除
          selected_member_names.innerHTML = removed_names_arry.join(",")// inputに追加

        }else{
          attendees_field.value += selected_member_id + ","
          selected_member_names.innerHTML += selected_member_name + ","
        }
        append_selectable_option.classList.toggle('is_selected')
      };

      append_selectable_option.classList.add(
        "cursor-pointer",
        "hover:bg-gray-200", 
        "border-b-2", 
        "border-gray-200",
        "p-2",
      )

      if (attendees_field.value.split(",").includes(String(append_selectable_option.getAttribute('data-id')))){//既に選択されている場合は、is_selectedを追加
        append_selectable_option.classList.add("is_selected")
      }

      if (opsions[i].innerHTML.indexOf(keyword) != -1 ){//ユーザーが入力した値が含まれている要素のみを追加する
        selectableOptions.appendChild(append_selectable_option)
      }
    }
  }

  serch_box.addEventListener("input",function(){//ユーザーの入力ごとに実行される関数
    if (this.value != ""){
      addSelectableOptions(this.value)
    }
  });

  function setDefaultValueInEdit () {//編集時に値をセットする
    let attendees_field = document.getElementById("attendees")
    let opsions = document.getElementById("select").children
    let selected_options_arry = attendees_field.value.split(",")// 選択されているIDを配列に入れて
    for(let i=0; i < opsions.length; i++){
      if (selected_options_arry.includes(String(opsions[i].value))){
        selected_member_names.innerHTML += opsions[i].innerHTML + ","
      } 
    }
  }
  setDefaultValueInEdit()
})