import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
  uri: 'https://dev.dafengge.top/graphql',
  fetch: (url, options) => Taro.request({
    url,
    method: options.method,
    data: options.body,
    header: options.headers
  }).then(({data, statusCode}) => {
    return {
      ok: () => {
        return statusCode >= 200 && statusCode < 300;
      },
      text: () => {
        return Promise.resolve(JSON.stringify(data))
      }
    }
  })
})
export default client

// const query = gql`
//     query banners($input: BannerQueryInput!) {
//       banners(bannerQueryInput: $input) {
//         id
//         tag
//         title
//         path
//         content
//         link
//       }
//     }
//   `

// export default  {
//   getBanner () {
//     getD(query)
//   }
// }

// function getD(query) {
//   return new Promise(resolve => {
//     Taro.request({
//       url: 'https://dev.dafengge.top/graphql',
//       data: JSON.stringify(`{query banners($input: BannerQueryInput!) {banners(bannerQueryInput: $input) {id}}}`),
//       // method: 'POST',
//       success(res) {
//         console.log('????', res)
//       },
//       fail(err) {
//         console.log('EE', err)
//       }
//     })
//   })
// }
// function asyncFn(query) {
//   return new Promise(resolve => {
//     request('https://dev.dafengge.top/graphql', query)
//       .then(data => {
//         console.log("????", data)
//         resolve(data)
//       }).catch(err => {
//         console.log('request err', err)
//       })
//   })
// }