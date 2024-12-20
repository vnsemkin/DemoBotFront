/* eslint-disable */


import './ProductList.css'
import { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import ProductItem from '../ProductItem/ProductItem'


const products = [
	{id: '1', title: 'Джинсы', price: 1500, description: 'Синего цвета, прямые'},
	{id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
	{id: '3', title: 'Джинсы 2', price: 1500, description: 'Синего цвета, прямые'},
	{id: '4', title: 'Куртка 8', price: 1200, description: 'Зеленого цвета, теплая'},
	{id: '5', title: 'Джинсы 3', price: 1500, description: 'Синего цвета, прямые'},
	{id: '6', title: 'Куртка 7', price: 1800, description: 'Зеленого цвета, теплая'},
	{id: '7', title: 'Джинсы 4', price: 1500, description: 'Синего цвета, прямые'},
	{id: '8', title: 'Куртка 5', price: 15000, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc += item.price
	}, 0)
}
const ProductList = () => {
	const [addedItems, setAddedItems] = useState([])
	const {tg, queryId} = useTelegram()
	
	const onSendData = useCallback(() => {
		if (!queryId) {
			console.error('Error: queryId is missing')
			return
		}
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		}
		fetch('http://95.213.248.10:8080/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		
	}, [addedItems])
	
	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)
		return () => {
			tg.offEvent('mainButtonClicked', onSendData)
		}
	}, [onSendData])
	
	
	const onAdd = (product) => {
		const alreadyAdded = addedItems.find(item => item.id === product.id)
		
		let newItems = [];
		
		if (alreadyAdded) {
			newItems = addedItems.filter(item => item.id !== product.id)
		} else {
			newItems = [...addedItems, product]
		}
		
		setAddedItems(newItems)
		
		if (newItems.length === 0){
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}`
			})
		}
	}
	
	return (
		<div className={'list'}>
			{products.map(item => (
				<ProductItem product={item} onAdd={onAdd} className={'item'} />
			))}
		</div>
	)
}

export default ProductList
