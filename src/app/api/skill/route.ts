import {NextResponse} from 'next/server';
import axios from 'axios';


export async function GET(request: Request) {
	const {searchParams} = new URL(request.url);
	const champName = searchParams.get('champ');
	const qLevel = Number.parseInt(searchParams.get('qlv') ?? '1');
	const wLevel = Number.parseInt(searchParams.get('wlv') ?? '1');
	const eLevel = Number.parseInt(searchParams.get('elv') ?? '1');
	const rLevel = Number.parseInt(searchParams.get('rlv') ?? '1');
	const reduceCooltime = Number.parseInt(searchParams.get('rc') ?? '0');
	if (!champName) return NextResponse.json({'error': 'no champ specified'});
	const version = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
		.then(res => res.data[0]);
	const champData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${champName}.json`)
		.then(res => res.data.data[champName]);
	const originQCool:number = champData.spells[0].cooldown[qLevel - 1];
	const originWCool:number = champData.spells[1].cooldown[wLevel - 1];
	const originECool:number = champData.spells[2].cooldown[eLevel - 1];
	const originRCool:number = champData.spells[3].cooldown[rLevel - 1];
	return NextResponse.json({
		q: calculateCooltime(originQCool, reduceCooltime),
		w: calculateCooltime(originWCool, reduceCooltime),
		e: calculateCooltime(originECool, reduceCooltime),
		r: calculateCooltime(originRCool, reduceCooltime),
	});
}

function calculateCooltime(cooltime: number, reduceCooltime: number) {
	return (cooltime * (1 - reduceCooltime / (reduceCooltime + 100))).toFixed(2);
}