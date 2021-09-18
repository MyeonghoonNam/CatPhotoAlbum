export default function Loading({ target }) {
  const $loading = document.createElement('div');
  $loading.className = 'Loading Modal';

  target.appendChild($loading);

  this.state = false;

  this.setState = (nextState) => {
    // 현재 상태와 다음 상태에 대하여 차이를 비교 후 렌더링 필요한 경우만 렌더링
    if (this.state === nextState) return;

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $loading.innerHTML = `
      <div class="content">
        <img width="100%" src="https://cdn.roto.codes/images/nyan-cat.gif" alt="Loading..."/>
      </div>
    `;

    $loading.style.display = this.state ? 'block' : 'none';
  };

  this.render();
}
