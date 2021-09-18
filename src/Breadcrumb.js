export default function Breadcrumb({ target, initialState, onClick }) {
  const $breadcrumb = document.createElement('nav');
  $breadcrumb.className = 'Breadcrumb';

  target.appendChild($breadcrumb);

  this.state = initialState;

  this.setState = (nextState) => {
    // 현재 상태와 다음 상태에 대하여 차이를 비교하기 위해 다음 메소드를 사용하여 비교하여 렌더링 구현
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) return;

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $breadcrumb.innerHTML = `
      <div class="Breadcrumb__item">Root</div>
      ${this.state
        .map(
          ({ id, name }) => `
            <div class="Breadcrumb__item" data-id="${id}">${name}</div>
          `
        )
        .join('')}
    `;
  };

  this.render();

  $breadcrumb.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest('.Breadcrumb__item');
    const { id } = $breadcrumbItem.dataset;

    onClick(id);
  });
}
