import { host, apiPath } from './config'
import axios from 'axios'
import qs from 'qs'

export function getGzInfo () {
  const url = host + apiPath + 'getGzContent'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSearchArea () {
  const url = host + apiPath + 'getSearchArea'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getHouses (param) {
  const url = host + apiPath + 'getHouses'

  return axios.post(url, qs.stringify(param)).then((res) => {

    res.data.forEach(function (v, k) {

      if (v['index_photo'] !== '') {
        res.data[k]['index_photo'] = host + v['index_photo']
      }   

      if (v['tag'] !== '') {
        let tag = v['tag'].toString().split(',')
        res.data[k]['tag'] = tag
      }
      
      res.data[k]['price'] = parseFloat(v['price'])
    });

    return Promise.resolve(res.data)
  })
}

export function getHousesDetail (id) {
  const url = host + apiPath + 'getHousesDetail/?id=' + id

  return axios.get(url).then( (res) => {

    if (res.data.house_type_image !== '') {
      res.data.house_type_image = host + res.data.house_type_image
    }

    let images = []

    res.data.image.forEach( (v, k) => {
      if (v !== '') {
        images[k] = host + v
      }
    })

    let tag = res.data.tag_list.toString().split(',')
    res.data.tag_list = tag

    res.data.price = parseFloat(res.data.price)

    res.data.image = images

    return Promise.resolve(res.data)
  })
}