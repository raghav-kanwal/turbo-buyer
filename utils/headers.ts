import { getPlatformData } from "./platform";

export function getHeaders(method: string, headersMap: any): Headers {
    const headers = new Headers();

    let platformInfo: any = {};

    if(navigator.userAgentData) {
        platformInfo.platform = navigator.userAgentData.platform, platformInfo.isMobile = navigator.userAgentData.mobile;
    }
    else {
        platformInfo.platform = getPlatformData();
        platformInfo.isMobile = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    }

    if(localStorage.getItem('turbo')) headers.append('Authorization', `Bearer ${localStorage.getItem('turbo')}`);
    headers.append('X-NMerchantId', `mid4`);
    headers.append('user-agent', `${navigator.userAgent}`);
    headers.append('X-NPlatformInfo', 'SHOPIFY');
    if(method !== 'GET') headers.append('Content-type', 'application/json');
    headersMap?.forEach((headerPair: any) => headers.append(headerPair[0], headerPair[1]));

    return headers;
}
