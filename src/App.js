import Nodes from './Nodes.js';
import Loading from './Loading.js';
import ImageViewer from './ImageViewer.js';
import Breadcrumb from './Breadcrumb.js';
import { request } from './api.js';
import { validateState } from './validate.js';

export default function App({ target }) {
  this.state = {
    isRoot: true,
    nodes: [],
    paths: [],
    selectedImageUrl: null,
    isLoading: false,
  };

  this.setState = (nextState) => {
    try {
      // App에서 중앙제어 형태로 각 컴포넌트의 상태를 다루므로 이곳에서 다음 상태의 정합성을 검사하돍 구현하였습니다.
      validateState(nextState);

      this.state = nextState;

      nodes.setState({
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      });

      imageViewer.setState({
        selectedImageUrl: this.state.selectedImageUrl,
      });

      loading.setState(this.state.isLoading);

      breadcrumb.setState(this.state.paths);
    } catch (e) {
      alert(e.message);
    }
  };

  const loading = new Loading({ target });

  const breadcrumb = new Breadcrumb({
    target,
    initialState: this.state.paths,
    onClick: async (id) => {
      // 클릭한 경로 외의 path를 제거한다.
      if (id) {
        const nextPaths = id ? [...this.state.paths] : [];
        const pathIndex = nextPaths.findIndex((path) => path.id === id);

        this.setState({
          ...this.state,
          paths: nextPaths.slice(0, pathIndex + 1),
        });
      } else {
        this.setState({
          ...this.state,
          paths: [],
        });
      }

      await fetchNodes(id);
    },
  });

  const nodes = new Nodes({
    target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        await fetchNodes(node.id);

        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        });
      } else if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedImageUrl: `https://cat-api.roto.codes/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      if (this.state.isLoading === false) {
        const nextPaths = [...this.state.paths];
        nextPaths.pop();

        this.setState({
          ...this.state,
          paths: nextPaths,
        });

        if (nextPaths.length === 0) {
          await fetchNodes();
        } else {
          await fetchNodes(nextPaths[nextPaths.length - 1].id);
        }
      }
    },
  });

  const imageViewer = new ImageViewer({
    target,
    initialState: {
      selectedImageUrl: this.state.selectedImageUrl,
    },
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  const fetchNodes = async (id) => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const nodes = await request(id ? `/${id}` : '/');

      this.setState({
        ...this.state,
        isRoot: id ? false : true,
        nodes,
        isLoading: false,
      });
    } catch (e) {
      alert(e.message);
    }
  };

  fetchNodes();
}
