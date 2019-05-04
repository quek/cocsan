import dice from '../dice';

export interface CustomSkill {
  name: string;
  value: number;
}

export default interface Character {
  uid: string;
  探索者名: string;
  職業: string;
  学校学位?: string;
  出身?: string;
  精神的な障害?: string;
  性別?: string;
  年齢?: string;
  STR: number;
  DEX: number;
  INT: number;
  アイデア: number;
  CON: number;
  APP: number;
  POW: number;
  幸運: number;
  SIZ: number;
  SAN: number;
  EDU: number;
  知識: number;
  最大正気度: number;
  ダメージボーナス: number;
  正気度ポイント: number;
  マジックポイント: number;
  耐久力: number;
  // 技能
  言いくるめ: number;
  医学: number;
  運転: number;
  応急手当: number;
  オカルト: number;
  回避: number;
  化学: number;
  鍵開け: number;
  隠す: number;
  隠れる: number;
  機械修理: number;
  聞き耳: number;
  クトゥルフ神話: number;
  芸術1: CustomSkill;
  芸術2: CustomSkill;
  経理: number;
  考古学: number;
  コンピューター: number;
  忍び歩き: number;
  写真術: number;
  重機械操作: number;
  乗馬: number;
  信用: number;
  心理学: number;
  人類学: number;
  水泳: number;
  製作1: CustomSkill;
  製作2: CustomSkill;
  製作3: CustomSkill;
  精神分析: number;
  生物学: number;
  説得: number;
  操作1: CustomSkill;
  操作2: CustomSkill;
  地質学: number;
  跳躍: number;
  追跡: number;
  電気修理: number;
  電子工学: number;
  天文学: number;
  投擲: number;
  登攀: number;
  図書館: number;
  ナビゲート: number;
  値切り: number;
  博物学: number;
  物理学: number;
  変装: number;
  法律: number;
  ほかの言語1: CustomSkill;
  ほかの言語2: CustomSkill;
  母国語: CustomSkill;
  マーシャルアーツ: number;
  目星: number;
  薬学: number;
  歴史1: CustomSkill;
  歴史2: CustomSkill;
  拳銃: number;
  サブマシンガン: number;
  ショットガン: number;
  マシンガン: number;
  ライフル: number;
}

function computeDamageBonus(STR: number, SIZ: number): number {
  const value = STR + SIZ;
  if (value <= 12) {
    return -dice.roll1D6();
  }
  if (value <= 16) {
    return -dice.roll1D4();
  }
  if (value <= 24) {
    return 0;
  }
  if (value <= 32) {
    return dice.roll1D4();
  }
  if (value <= 40) {
    return dice.roll1D6();
  }
  if (value <= 56) {
    return dice.roll2D6();
  }
  if (value <= 72) {
    return dice.roll3D6();
  }
  if (value <= 88) {
    return dice.roll4D6();
  }
  let result = dice.roll4D6();
  for (let i = value - 88; i > 0; i - 16) {
    result += dice.roll1D6();
  }
  return result;
}

export function makeCharacter(values: Partial<Character> = {}): Character {
  console.log('makeCharacter');
  const STR = dice.roll3D6();
  const DEX = dice.roll3D6();
  const INT = dice.roll2D6() + 6;
  const CON = dice.roll3D6();
  const APP = dice.roll3D6();
  const POW = dice.roll3D6();
  const SIZ = dice.roll2D6() + 6;
  const EDU = dice.roll3D6() + 3;
  return {
    uid: '',
    探索者名: '',
    職業: '',
    学校学位: '',
    出身: '',
    精神的な障害: '',
    性別: '',
    年齢: '',
    STR,
    DEX,
    INT,
    アイデア: INT * 5,
    CON,
    APP,
    POW,
    幸運: POW * 5,
    SIZ,
    SAN: POW * 5,
    EDU,
    知識: EDU * 5,
    最大正気度: 99,
    ダメージボーナス: computeDamageBonus(STR, SIZ),
    正気度ポイント: POW * 5,
    マジックポイント: POW,
    耐久力: Math.ceil((CON + SIZ) / 2),
    // 技能
    言いくるめ: 5,
    医学: 5,
    運転: 20,
    応急手当: 30,
    オカルト: 5,
    回避: DEX * 2,
    化学: 1,
    鍵開け: 1,
    隠す: 15,
    隠れる: 10,
    機械修理: 20,
    聞き耳: 25,
    クトゥルフ神話: 0,
    芸術1: { name: '', value: 5 },
    芸術2: { name: '', value: 5 },
    経理: 10,
    考古学: 1,
    コンピューター: 1,
    忍び歩き: 10,
    写真術: 10,
    重機械操作: 1,
    乗馬: 5,
    信用: 15,
    心理学: 5,
    人類学: 1,
    水泳: 25,
    製作1: { name: '', value: 5 },
    製作2: { name: '', value: 5 },
    製作3: { name: '', value: 5 },
    精神分析: 1,
    生物学: 1,
    説得: 15,
    操作1: { name: '', value: 1 },
    操作2: { name: '', value: 1 },
    地質学: 1,
    跳躍: 25,
    追跡: 10,
    電気修理: 10,
    電子工学: 1,
    天文学: 1,
    投擲: 25,
    登攀: 40,
    図書館: 25,
    ナビゲート: 10,
    値切り: 5,
    博物学: 10,
    物理学: 1,
    変装: 1,
    法律: 5,
    ほかの言語1: { name: '', value: 1 },
    ほかの言語2: { name: '', value: 1 },
    母国語: { name: '', value: EDU * 5 },
    マーシャルアーツ: 1,
    目星: 25,
    薬学: 1,
    歴史1: { name: '', value: 20 },
    歴史2: { name: '', value: 20 },
    拳銃: 20,
    サブマシンガン: 15,
    ショットガン: 30,
    マシンガン: 15,
    ライフル: 25,
    ...values
  };
}
