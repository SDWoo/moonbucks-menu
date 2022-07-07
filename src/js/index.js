import { $ } from "./utils/dom.js";
/*
 Step 2 요구사항

 TODO 1 localStorage 데이터 저장 후 각 카테고리 별메뉴판 관리
 [ㅇ] localStorage에 메뉴 데이터를 저장한다.
 [ㅇ] localStorage에서 메뉴 데이터를 받아온다.
 [] 에스프레소 메뉴판 관리
 [] 프라푸치노 메뉴판 관리
 [] 블렌디드 메뉴판 관리
 [] 티바나 메뉴판 관리
 [] 디저트 메뉴판 관리


 [] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
 [] 품절 버튼을 추가
 [] sold-out class를 추가하여 상태를 변경한다.
 [] 품절 상태 메뉴의 마크업
*/
const store = {
  setLocalStorage(name) {
    localStorage.setItem("menu", JSON.stringify(name));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = [];

  const render = () => {
    const menuTemplate = this.menu
      .map((item) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join("");
    $("#espresso-menu-list").innerHTML = menuTemplate;
    updateCount();
  };

  this.init = () => {
    this.menu = store.getLocalStorage();
    render();
  };

  const updateCount = () => {
    const menuCount = this.menu.length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenu = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("다시 입력해주세요");
      return;
    }
    const menuName = $("#espresso-menu-name").value;
    this.menu.push({ name: menuName });
    store.setLocalStorage(this.menu);
    render();
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
const app = new App();
app.init();
