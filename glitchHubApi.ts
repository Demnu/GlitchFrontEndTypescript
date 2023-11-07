/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type OrderDtos = {
  /** @example "123" */
  id: string;
  /** @example "A1000" */
  invoiceNumber: string;
  /** @example "08/09/1998" */
  dateCreated: string;
  /** @example "Harry" */
  customerName: string;
  orderStatus: 'notCalculated' | 'calculated';
  products: {
    /** @example "Haywire Blend" */
    productName: string;
    /** @example "12345" */
    id: string;
    /** @example true */
    possiblyCoffee: boolean;
    /** @example 123 */
    price: number;
    /** @example "HW_B" */
    sku: string;
    /** @example 20 */
    amountOrdered: number;
    /** @example true */
    hasRecipe: boolean;
  }[];
}[];

export interface OrderDto {
  /** @example "123" */
  id: string;
  /** @example "A1000" */
  invoiceNumber: string;
  /** @example "08/09/1998" */
  dateCreated: string;
  /** @example "Harry" */
  customerName: string;
  orderStatus: {
    /** @example "string" */
    type?: string;
    /** @example ["notCalculated","calculated"] */
    enum?: string[];
  };
  products: {
    /** @example "Haywire Blend" */
    productName: string;
    /** @example "12345" */
    id: string;
    /** @example true */
    possiblyCoffee: boolean;
    /** @example 123 */
    price: number;
    /** @example "HW_B" */
    sku: string;
    /** @example 20 */
    amountOrdered: number;
    /** @example true */
    hasRecipe: boolean;
  }[];
}

export interface RecipeDto {
  /** @example 1234 */
  id: number;
  /** @example "Blurger" */
  productId: string;
  /** @example "Yummy Blend" */
  recipeName: string;
  recipe_beans: {
    /** @example 1 */
    id: number;
    /** @example 2 */
    beanId: number;
    /** @example 3 */
    recipeId: number;
    /** @example 100 */
    amountOrdered: number;
    bean: {
      /** @example 2 */
      id: number;
      /** @example "Roasty bean" */
      beanName: string;
    };
  }[];
}

export type RecipeDtos = {
  /** @example 1234 */
  id: number;
  /** @example "Blurger" */
  productId: string;
  /** @example "Yummy Blend" */
  recipeName: string;
  recipe_beans: {
    /** @example 1 */
    id: number;
    /** @example 2 */
    beanId: number;
    /** @example 3 */
    recipeId: number;
    /** @example 100 */
    amountOrdered: number;
    bean: {
      /** @example 2 */
      id: number;
      /** @example "Roasty bean" */
      beanName: string;
    };
  }[];
}[];

export interface RecipeRequestDto {
  /** @example "2" */
  productId?: string;
  /** @example "Yummy recipe" */
  recipeName?: string;
  beans?: {
    /** @example 4 */
    beanId?: number;
    /** @example 400 */
    beanAmount?: number;
  }[];
}

export interface MakeCalculationRequestDto {
  /** @example ["a0d1b2b9-b532-477f-a9a5-f4158d49f28c","95119cbc-2430-430e-be94-1fbf2906824c"] */
  orderIds?: string[];
}

export interface MakeCalculationResponseDto {
  ordersCalculatedInformation?: {
    /** @example "2b156adb-78fc-43d8-a7c8-24b018f5818f" */
    orderId?: string;
    /** @example "10/12/2023" */
    createdAt?: string;
    /** @example "Autumn Rooms" */
    customerName?: string;
  }[];
  productsTally?: {
    /** @example "2" */
    productId?: string;
    /** @example "Sweet Kicks Blend 1kg" */
    productName?: string;
    /** @example 50 */
    amountOrdered?: number;
    /** @example true */
    hasRecipe?: boolean;
  }[];
  beansTally?: {
    /** @example 2 */
    beanId?: number;
    /** @example "Indonesia" */
    beanName?: string;
    /** @example 50000 */
    amountNeededToBeRoasted?: number;
  }[];
}

export interface ProductExtendedJsonSchema {
  /** @example "Haywire Blend" */
  productName: string;
  /** @example "12345" */
  id: string;
  /** @example true */
  possiblyCoffee: boolean;
  /** @example 123 */
  price: number;
  /** @example "HW_B" */
  sku: string;
  /** @example 20 */
  amountOrdered: number;
  /** @example true */
  hasRecipe: boolean;
}

export interface OrderStatusEnum {
  orderStatus: 'notCalculated' | 'calculated';
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://localhost:9000'
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    });
  };
}

/**
 * @title Glitch Backend
 * @version 1.0.0
 * @baseUrl http://localhost:9000
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name ListOrdersList
     * @request GET:/orders/listOrders
     */
    listOrdersList: (params: RequestParams = {}) =>
      this.request<OrderDtos, any>({
        path: `/orders/listOrders`,
        method: 'GET',
        ...params
      })
  };
  ordermentum = {
    /**
     * No description
     *
     * @tags Ordermentum
     * @name SaveProductsFromOrdermentumCreate
     * @request POST:/ordermentum/saveProductsFromOrdermentum
     */
    saveProductsFromOrdermentumCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/ordermentum/saveProductsFromOrdermentum`,
        method: 'POST',
        ...params
      }),

    /**
     * No description
     *
     * @tags Ordermentum
     * @name SaveOrdersFromOrdermentumCreate
     * @request POST:/ordermentum/saveOrdersFromOrdermentum
     */
    saveOrdersFromOrdermentumCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/ordermentum/saveOrdersFromOrdermentum`,
        method: 'POST',
        ...params
      })
  };
  recipes = {
    /**
     * No description
     *
     * @tags Recipes
     * @name ListRecipesList
     * @request GET:/recipes/listRecipes
     */
    listRecipesList: (params: RequestParams = {}) =>
      this.request<RecipeDtos, any>({
        path: `/recipes/listRecipes`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags Recipes
     * @name CreateRecipeCreate
     * @request POST:/recipes/createRecipe
     */
    createRecipeCreate: (body: RecipeRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipes/createRecipe`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        ...params
      })
  };
  calculations = {
    /**
     * No description
     *
     * @tags Calculations
     * @name MakeCalculationCreate
     * @request POST:/calculations/makeCalculation
     */
    makeCalculationCreate: (
      body: MakeCalculationRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<MakeCalculationResponseDto, any>({
        path: `/calculations/makeCalculation`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        ...params
      })
  };
  logs = {
    /**
     * No description
     *
     * @tags Logs
     * @name LogsList
     * @request GET:/logs/
     */
    logsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logs/`,
        method: 'GET',
        ...params
      })
  };
}
