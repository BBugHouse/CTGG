import axios from 'axios';
import {NextResponse} from 'next/server';

type Champ = {
	id: string;
	name: string;
}

export async function GET() {
	// const arr = [];
	const version = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
		.then(res => res.data[0]);
	const champs:Champ[] = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`)
		.then(res => Object.values(res.data.data));
	champs.sort((a, b) => {
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	const result = JSON.stringify(
		await Promise.all(
			champs.map(async champ => {
				const spellData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${champ.id}.json`)
					.then(res => res.data.data[champ.id].spells);
				return {
					'id': champ.id,
					'name': champ.name,
					'champ_image': `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`,
					'q_image': `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData[0].id}.png`,
					'w_image': `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData[1].id}.png`,
					'e_image': `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData[2].id}.png`,
					'r_image': `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData[3].id}.png`,
				}
			})
		)
	);
	return NextResponse.json(result);
}