//step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// ㅇ 메뉴의 이름을 입력받고 나면 엔터키 입력으로 추가한다.
// ㅇ 메뉴의 이름을 입력받고 나면 확인버튼으로 추가한다.
// ㅇ 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// ㅇ 총 메뉴 갯수를 count하여 상단에 보여준다.
// ㅇ 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// ㅇ 사용자 입력값이 빈 값이라면 추가되지 않는다.

function App() {
  const $ = (selector) => document.querySelector(selector);
  const addMenu = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세여");
      return;
    }
    const menuName = $("#espresso-menu-name").value;
    const menuNameTemplate = (menuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
        수정
        </button>  
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
        삭제
        </button>
        </li>
        `;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuNameTemplate(menuName)
    );
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
    $("#espresso-menu-name").value = "";
  };
  // form 태그 자동 전송 막기
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenu);
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenu();
  });
}

App();
