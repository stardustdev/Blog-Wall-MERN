export const getErrorMsg = (err) => {
  if (err.response?.status === 401)
    return 'You are not allowed to do this action. Please login first';

  return err.response?.data?.message || 'Sorry something went wrong. Please try again.';
};
