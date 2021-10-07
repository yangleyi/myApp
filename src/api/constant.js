import Vue from 'vue'
import { gql } from 'graphql-tag'

const api = {
  // 轮播图
  banners: gql`
    query banners($input: BannerQueryInput!) {
      banners(bannerQueryInput: $input) {
        id
        path
        link
      }
    }`,
  // 商铺
  store: gql`
    query shops($input: ShopsQueryInput!) {
      shops(query: $input) {
        edges {
          id
          name
          address
          qqchat
          wechat
          status
          isPassed
          phone
          city
          description
          cover
          categories{
            id
            name
            shopIndex
          }
        }
        pageInfo {
          total
        }
      }
    }`,
  // 通话记录
  callLog: gql`
    query phoneRecords($query: PhoneRecordsQuery!) {
      phoneRecords(query: $query) {
        edges {
            id
            phone
            user {
                id
                name
            }
            createdAt
            shop {
                id
                name
            }
        }
        pageInfo {
            total
        }
      }
    }`,
  // 创建通话记录
  addCallLog: gql`
    mutation createPhoneRecord($input: CreatePhoneRecordInput!) {
      createPhoneRecord(input: $input) {
          id
          phone
          user {
              id
              name
          }
          createdAt
      }
  }`,
  // 分类
  category: gql`
    query categorys($input: CategorysQuery) {
      categorys(query: $input) {
        id
        name
        status
        tag
        route
        image
        children {
          id
          name
          status
          tag
          route
          image
        }
      }
    }`,
  // 商家详情
  storeDetail: gql`
    query shop($query: ShopQueryInput) {
      shop(query: $query) {
        id
        name
        qqchat
        wechat
        phone
        description
        status
        isPassed
        belongto
        categories {
          id
          name
          status
          tag
          route
          image
          shopIndex
        }
        address
        area
        city
        cover
        shopType
        phoneCount
        phones {
          id
          phone
          count
        }
      }
    }`, // phoneCount
}
Vue.prototype.$api = api