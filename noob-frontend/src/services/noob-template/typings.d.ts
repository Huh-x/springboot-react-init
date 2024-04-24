declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseDataInfoVO_ = {
    code?: number;
    data?: DataInfoVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageDataInfo_ = {
    code?: number;
    data?: PageDataInfo_;
    message?: string;
  };

  type BaseResponsePageDataInfoVO_ = {
    code?: number;
    data?: PageDataInfoVO_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageTemplate_ = {
    code?: number;
    data?: PageTemplate_;
    message?: string;
  };

  type BaseResponsePageTemplateVO_ = {
    code?: number;
    data?: PageTemplateVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTemplateVO_ = {
    code?: number;
    data?: TemplateVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BatchDeleteRequest = {
    idList?: number[];
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type DataInfo = {
    createTime?: string;
    creater?: number;
    dataContent?: string;
    dataName?: string;
    dataType?: string;
    id?: number;
    isDelete?: number;
    status?: number;
    updateTime?: string;
    updater?: number;
  };

  type DataInfoAddRequest = {
    dataContent?: string;
    dataName?: string;
    dataType?: string;
  };

  type DataInfoQueryRequest = {
    creater?: number;
    current?: number;
    dataContent?: string;
    dataName?: string;
    dataType?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type DataInfoStatusUpdateRequest = {
    id?: number;
    operType?: string;
  };

  type DataInfoUpdateRequest = {
    dataContent?: string;
    dataName?: string;
    dataType?: string;
    id?: number;
    status?: number;
  };

  type DataInfoVO = {
    createTime?: string;
    creater?: UserVO;
    dataContent?: string;
    dataName?: string;
    dataType?: string;
    id?: number;
    isDelete?: number;
    status?: number;
    updateTime?: string;
    updater?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getDataInfoVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTemplateVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageDataInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DataInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDataInfoVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: DataInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTemplate_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Template[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTemplateVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TemplateVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    status?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostStatusUpdateRequest = {
    id?: number;
    operType?: string;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tagList?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    status?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type Template = {
    createTime?: string;
    creater?: number;
    id?: number;
    isDelete?: number;
    status?: number;
    templateContent?: string;
    templateName?: string;
    updateTime?: string;
    updater?: number;
  };

  type TemplateAddRequest = {
    templateContent?: string;
    templateName?: string;
  };

  type TemplateQueryRequest = {
    creater?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    templateContent?: string;
    templateName?: string;
  };

  type TemplateStatusUpdateRequest = {
    id?: number;
    operType?: string;
  };

  type TemplateUpdateRequest = {
    id?: number;
    status?: number;
    templateContent?: string;
    templateName?: string;
  };

  type TemplateVO = {
    createTime?: string;
    creater?: UserVO;
    id?: number;
    isDelete?: number;
    status?: number;
    templateContent?: string;
    templateName?: string;
    updateTime?: string;
    updater?: UserVO;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserStatusUpdateRequest = {
    id?: number;
    operType?: string;
    userStatus?: number;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
  };
}
