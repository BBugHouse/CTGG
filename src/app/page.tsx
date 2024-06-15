'use client';

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

type Champ = {
	id: string;
	name: string;
	champ_image: string;
	q_image: string;
	w_image: string;
	e_image: string;
	r_image: string;
}

export default function Home() {
	const [name, setName] = useState('Annie');
	const [search, setSearch] = useState('');

	const [qlv, setQlv] = useState(1);
	const [wlv, setWlv] = useState(1);
	const [elv, setElv] = useState(1);
	const [rlv, setRlv] = useState(1);
	const [rc, setRc] = useState(0);

	const [qcd, setQcd] = useState('');
	const [wcd, setWcd] = useState('');
	const [ecd, setEcd] = useState('');
	const [rcd, setRcd] = useState('');

	const [data, setData] = useState<Champ[]>([]);

	useEffect(() => {
		axios.get(`/api/all_champs`)
			.then((res) => {
				setData(JSON.parse(res.data));
			});
	}, []);
	return (
		<div className='flex'>
			<div className='flex flex-col'>
				<input
					type='text'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					placeholder='챔피언 이름을 검색하세요'/>
				<div className='grid grid-cols-4 w-96 max-h-[calc(100vh-52px)] overflow-auto'>
					{data.map((champ) => {
						if(champ.name && champ.name.includes(search)){
							return (
								<button
									key={champ.id}
									className='flex flex-col items-center'
									onClick={() => {
										setName(champ.id);
										setQcd('');
										setWcd('');
										setEcd('');
										setRcd('');
									}}
								>
									<img src={champ.champ_image} className='w-14 h-14 rounded-full'/>
									<p>{champ.name}</p>
								</button>
							);
						}
					})}
				</div>
			</div>
			<div className='flex flex-col'>
				<div className='flex justify-between'>
					<div>
						<img
							src={data.find((champ => champ.id === name))?.q_image}
							className='w-14 h-14 rounded-full'/>
						<p>{qcd}초</p>
					</div>
					<div>
						<img
							src={data.find((champ => champ.id === name))?.w_image}
							className='w-14 h-14 rounded-full'/>
						<p>{wcd}초</p>
					</div>
					<div>
						<img
							src={data.find((champ => champ.id === name))?.e_image}
							className='w-14 h-14 rounded-full'/>
						<p>{ecd}초</p>
					</div>
					<div>
						<img
							src={data.find((champ => champ.id === name))?.r_image}
							className='w-14 h-14 rounded-full'/>
						<p>{rcd}초</p>
					</div>
				</div>
				<input
					type='number'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					onChange={(e) => {
						setRc(parseInt(e.target.value));
					}}
					defaultValue='0'
					placeholder='쿨감을 적어주세요'/>
				<input
					type='number'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					onChange={(e) => {
						setQlv(parseInt(e.target.value));
					}}
					defaultValue='1'
					placeholder='Q레벨을 적어주세요'/>
				<input
					type='number'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					onChange={(e) => {
						setWlv(parseInt(e.target.value));
					}}
					defaultValue='1'
					placeholder='W레벨을 적어주세요'/>
				<input
					type='number'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					onChange={(e) => {
						setElv(parseInt(e.target.value));
					}}
					defaultValue='1'
					placeholder='E레벨을 적어주세요'/>
				<input
					type='number'
					className='outline-none border border-gray-600 rounded-md w-96 h-10 px-2 py-1 my-2'
					onChange={(e) => {
						setRlv(parseInt(e.target.value));
					}}
					defaultValue='1'
					placeholder='R레벨을 적어주세요'/>
				<button
					className='outline-none border border-gray-900 rounded-md mt-5 mb-5 w-96'
					onClick={() => {
						axios.get(`/api/skill?champ=${name}&qlv=${qlv}&wlv=${wlv}&elv=${elv}&rlv=${rlv}&rc=${rc}`)
							.then((res) => {
								setQcd(res.data.q);
								setWcd(res.data.w);
								setEcd(res.data.e);
								setRcd(res.data.r);
							});
					}}
				>계산
				</button>
			</div>
		</div>
	);
}
