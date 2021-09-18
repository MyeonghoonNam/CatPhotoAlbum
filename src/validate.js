export const validateState = (state) => {
  const { isRoot, isLoading, nodes, paths, selectedImageUrl } = state;
  try {
    validateIsBoolean(isRoot);
    validateIsBoolean(isLoading);
    validateIsArray(nodes);
    validateIsArray(paths);
    validateIsImageUrl(selectedImageUrl);
  } catch (e) {
    throw e;
  }
};

const validateIsBoolean = (value) => {
  const checkIsBoolean = typeof value === 'boolean';

  if (checkIsBoolean === false) {
    throw new Error('올바른 Boolean 형태가 아닙니다.');
  }
};

const validateIsArray = (value) => {
  if (Array.isArray(value)) {
    throw new Error('올바른 Array 형태가 아닙니다.');
  }
};

const validateIsImageUrl = (value) => {
  // null과 정규식을 통한 url만 정상 수행
  if (value === null) {
    return;
  }

  const validImageUrlRegex = /^(http|https):(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;

  if (validImageUrlRegex.test(value) === false) {
    throw new Error('올바른 ImageUrl 형태가 아닙니다.');
  }
};
