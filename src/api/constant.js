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
}
Vue.prototype.$api = api