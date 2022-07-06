/*
요구사항 step 1
  1. 메뉴 추가 기능
 [o] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 으로 추가한다.
 [o] 에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
 [o] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
 [o] 사용자 입력값이 빈 값이라면 추가되지 않는다.
 
 2. 메뉴 수정 기능
 [o] 메뉴의 수정 버튼을 누르면 수정 한다. (eventListner)
 [o] 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

 3. 메뉴 삭제 기능
 [o] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
 [o] 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
 
 4. 부가 기능
 [o] 총 메뉴 갯수를 count하여 상단에 보여준다.
*/
const $ = (selector) => document.querySelector(selector);
function app() {
  const updateCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenu = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("다시 입력해주세요");
      return;
    }
    const menuName = $("#espresso-menu-name").value;
    const menuTemplate = (menuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
        수정
        </button>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
        삭제
        </button>
        </li>`;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuTemplate(menuName)
    );
    updateCount();
    $("#espresso-menu-name").value = "";
  };

  const editMenu = (e) => {
    const MenuBeforeEdit = e.target.closest("li").querySelector(".menu-name");
    const MenuAfterEdit = prompt(
      "다시 메뉴를 입력해주세요",
      MenuBeforeEdit.innerText
    );
    e.target.closest("li").querySelector(".menu-name").innerText =
      MenuAfterEdit;
  };

  const removeMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까? ")) {
      e.target.closest("li").remove();
    }
    updateCount();
  };
  // button add menu
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenu();
  });

  // enter add menu
  $("#espresso-menu-name").addEventListener(
    "keydown",
    ({ key, isComposing }) => {
      if (isComposing || key !== "Enter") {
        return;
      }
      addMenu();
    }
  );
  // form 태그 자동 넘김 방지
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴 수정 기능 & 메뉴 삭제 기능 (이벤트 위임 => 여기서 몇개 가능하기 때문)
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      editMenu(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
    }
  });
}

app();
