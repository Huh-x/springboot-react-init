// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTemplate POST /api/template/add */
export async function addTemplateUsingPost(
  body: API.TemplateAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/template/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** batchDeleteTemplate POST /api/template/batchDeleteTemplate */
export async function batchDeleteTemplateUsingPost(
  body: API.BatchDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/template/batchDeleteTemplate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTemplate POST /api/template/delete */
export async function deleteTemplateUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/template/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTemplateVOById GET /api/template/get/vo */
export async function getTemplateVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTemplateVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTemplateVO_>('/api/template/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** handleTemplateStatus POST /api/template/handleTemplateStatus */
export async function handleTemplateStatusUsingPost(
  body: API.TemplateStatusUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/template/handleTemplateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTemplateByPage POST /api/template/list/page */
export async function listTemplateByPageUsingPost(
  body: API.TemplateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTemplate_>('/api/template/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTemplateVOByPage POST /api/template/list/page/vo */
export async function listTemplateVoByPageUsingPost(
  body: API.TemplateQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTemplateVO_>('/api/template/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTemplate POST /api/template/update */
export async function updateTemplateUsingPost(
  body: API.TemplateUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/template/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
