/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    // 设定admin
    canAdmin: currentUser && currentUser.userRole === 'admin',
    
    // 设定supAdmin
    canSupAdmin: currentUser && currentUser.userRole === 'supAdmin',
  };
}
