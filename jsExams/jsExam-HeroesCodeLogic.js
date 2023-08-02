function heroesCodeLogic(input) {
	let countHeroes = Number(input.shift());
	let heroes = {};

	for (let i = 0; i < countHeroes ; i++) {
		let [hero, hp, mp] = input.shift().split(' ');
		heroes[hero] = {
			hp: Number(hp),
			mp: Number(mp),
		};
	}

	let commandLine = input.shift();
	while (commandLine !== 'End'){
		let command = commandLine.split(' - ');
		let hero = command[1];

		switch (command[0]){
			case 'CastSpell':
				let neededMP = Number(command[2]);
				let spellName = command[3];
				if (heroes[hero].mp >= neededMP){
					heroes[hero].mp -= neededMP;
					console.log(`${hero} has successfully cast ${spellName} and now has ${heroes[hero].mp} MP!`);
				} else {
					console.log(`${hero} does not have enough MP to cast ${spellName}!`);
				}
				break;
			case 'TakeDamage':
				let damage = Number(command[2]);
				let attacker = command[3];

				heroes[hero].hp -= damage;

				if (heroes[hero].hp <= 0){
					delete heroes[hero]
					console.log(`${hero} has been killed by ${attacker}!`)
				}else{
					console.log(`${hero} was hit for ${damage} HP by ${attacker} and now has ${heroes[hero].hp} HP left!`)
				}
				break;
			case 'Recharge':
				let manaAmount = Number(command[2]);
				if (heroes[hero].mp + manaAmount > 200){
					let recharge = 200 - heroes[hero].mp;
					heroes[hero].mp = 200;
					console.log(`${hero} recharged for ${recharge} MP!`);
				}else {
					heroes[hero].mp += manaAmount;
					console.log(`${hero} recharged for ${manaAmount} MP!`);
				}
				break;
			case 'Heal':
				let healAmount = Number(command[2]);
				if ((heroes[hero].hp + healAmount) > 100){
					let recharge = 100 - heroes[hero].hp;
					heroes[hero].hp = 100;
					console.log(`${hero} healed for ${recharge} HP!`);
				}else {
					heroes[hero].hp += healAmount;
					console.log(`${hero} healed for ${healAmount} HP!`);
				}
				break;
		}

		commandLine = input.shift()
	}

	for (const hero in heroes) {
		console.log(`${hero}\n  HP: ${heroes[hero].hp}\n  MP: ${heroes[hero].mp}`)
	}
}

heroesCodeLogic((["4",
	"Adela 90 150",
	"SirMullich 70 40",
	"Ivor 1 111",
	"Tyris 94 61",
	"Heal - SirMullich - 50",
	"Recharge - Adela - 100",
	"CastSpell - Tyris - 1000 - Fireball",
	"TakeDamage - Tyris - 99 - Fireball",
	"TakeDamage - Ivor - 3 - Mosquito",
	"End"])
)