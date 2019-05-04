import React from 'react';
import { Subscribe } from 'unstated';
import NewContainer from './NewContainer';
import { Form, Field } from 'react-final-form';
import Character, {
  totalSkillPoint,
  makeCharacter
} from '../../models/Character';
import ErrorMessage from '../ErrorMessage';
import AppContainer from '../AppContainer';
import currentUser from '../../currentUser';
import styled from 'styled-components';
import { d } from '../../util';
import dice from '../../dice';

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const AbilityCol = styled(Col)`
  input {
    width: 2rem;
  }
`;

const SexRow = styled(Row)`
  input {
    width: 4rem;
  }
`;

const SkillRow = styled(Row)`
  input[type='number'] {
    width: 2rem;
  }
`;

interface Props {
  c: NewContainer;
  app: typeof AppContainer;
}

const FT = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field type="text" name={name} component="input" />
    <ErrorMessage name={name} />
  </div>
);

function parseNumber(value: string) {
  if (value) {
    return parseInt(value, 10);
  }
  return undefined;
}

const FN = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field type="number" name={name} component="input" parse={parseNumber} />
    <ErrorMessage name={name} />
  </div>
);

const FS = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field
      type="number"
      name={`skills.${name}`}
      component="input"
      parse={parseNumber}
    />
    <ErrorMessage name={`skills.${name}`} />
  </div>
);

const FCS = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field type="text" name={`skills.${name}.name`} component="input" />
    <ErrorMessage name={`skills.${name}.name`} />
    <Field
      type="number"
      name={`skills.${name}.value`}
      component="input"
      parse={parseNumber}
    />
    <ErrorMessage name={`skills.${name}.value`} />
  </div>
);

class New extends React.Component<Props> {
  private defaultCharacter: Character;
  private defaultPoint: number;
  public constructor(props: Props) {
    super(props);
    this.defaultCharacter = makeCharacter();
    this.defaultPoint = totalSkillPoint();
  }

  public render() {
    return (
      <Form
        initialValues={this.defaultCharacter}
        onSubmit={this.handleSubmit}
        render={props => {
          const { 技能ポイント, 興味ポイント } = props.values;
          const used =
            totalSkillPoint(props.values as Character) - this.defaultPoint;
          const 残り技能ポイント =
            used > 技能ポイント ? 0 : 技能ポイント - used;
          const 残り興味ポイント =
            残り技能ポイント > 0
              ? 興味ポイント
              : 興味ポイント - (used - 技能ポイント);

          return (
            <form onSubmit={props.handleSubmit}>
              <Col>
                <Row>
                  <Col>
                    {FT({ name: '探索者名' })}
                    {FT({ name: '職業' })}
                    {FT({ name: '学校学位' })}
                    {FT({ name: '出身' })}
                    {FT({ name: '精神的な障害' })}
                    <SexRow>
                      {FT({ name: '性別' })}
                      {FT({ name: '年齢' })}
                    </SexRow>
                  </Col>
                  <AbilityCol>
                    <Row>
                      {FN({ name: 'STR' })}
                      {FN({ name: 'DEX' })}
                      {FN({ name: 'INT' })}
                      {FN({ name: 'アイデア' })}
                    </Row>
                    <Row>
                      {FN({ name: 'CON' })}
                      {FN({ name: 'APP' })}
                      {FN({ name: 'POW' })}
                      {FN({ name: '幸運' })}
                    </Row>
                    <Row>
                      {FN({ name: 'SIZ' })}
                      {FN({ name: 'SAN' })}
                      {FN({ name: 'EDU' })}
                      {FN({ name: '知識' })}
                    </Row>
                    <Row>
                      {FN({ name: '最大正気度' })}
                      {FN({ name: 'ダメージボーナス' })}
                    </Row>
                  </AbilityCol>
                </Row>
                <Row>
                  {FN({ name: '正気度ポイント' })}
                  {FN({ name: 'マジックポイント' })}
                  {FN({ name: '耐久力' })}
                </Row>
                <Row>
                  {FN({ name: '技能ポイント' })}
                  {残り技能ポイント}
                  {FN({ name: '興味ポイント' })}
                  {残り興味ポイント}
                </Row>
                <SkillRow>
                  <Col>
                    {FS({ name: '言いくるめ' })}
                    {FS({ name: '医学' })}
                    {FS({ name: '運転' })}
                    {FS({ name: '応急手当' })}
                    {FS({ name: 'オカルト' })}
                    {FS({ name: '回避' })}
                    {FS({ name: '化学' })}
                    {FS({ name: '鍵開け' })}
                    {FS({ name: '隠す' })}
                    {FS({ name: '隠れる' })}
                    {FS({ name: '機械修理' })}
                    {FS({ name: '聞き耳' })}
                    {FS({ name: 'クトゥルフ神話' })}
                    {FCS({ name: '芸術1' })}
                    {FCS({ name: '芸術2' })}
                    {FS({ name: '経理' })}
                    {FS({ name: '考古学' })}
                    {FS({ name: 'コンピューター' })}
                    {FS({ name: '忍び歩き' })}
                    {FS({ name: '写真術' })}
                    {FS({ name: '重機械操作' })}
                    {FS({ name: '乗馬' })}
                    {FS({ name: '信用' })}
                    {FS({ name: '心理学' })}
                    {FS({ name: '人類学' })}
                  </Col>
                  <Col>
                    {FS({ name: '水泳' })}
                    {FCS({ name: '製作1' })}
                    {FCS({ name: '製作2' })}
                    {FCS({ name: '製作3' })}
                    {FS({ name: '精神分析' })}
                    {FS({ name: '生物学' })}
                    {FS({ name: '説得' })}
                    {FCS({ name: '操作1' })}
                    {FCS({ name: '操作2' })}
                    {FS({ name: '地質学' })}
                    {FS({ name: '跳躍' })}
                    {FS({ name: '追跡' })}
                    {FS({ name: '電気修理' })}
                    {FS({ name: '電子工学' })}
                    {FS({ name: '天文学' })}
                    {FS({ name: '投擲' })}
                    {FS({ name: '登攀' })}
                    {FS({ name: '図書館' })}
                    {FS({ name: 'ナビゲート' })}
                    {FS({ name: '値切り' })}
                    {FS({ name: '博物学' })}
                    {FS({ name: '物理学' })}
                    {FS({ name: '変装' })}
                    {FS({ name: '法律' })}
                  </Col>
                  <Col>
                    {FCS({ name: 'ほかの言語1' })}
                    {FCS({ name: 'ほかの言語2' })}
                    {FCS({ name: '母国語' })}
                    {FS({ name: 'マーシャルアーツ' })}
                    {FS({ name: '目星' })}
                    {FS({ name: '薬学' })}
                    {FCS({ name: '歴史1' })}
                    {FCS({ name: '歴史2' })}
                    {FS({ name: '拳銃' })}
                    {FS({ name: 'サブマシンガン' })}
                    {FS({ name: 'ショットガン' })}
                    {FS({ name: 'マシンガン' })}
                    {FS({ name: 'ライフル' })}
                  </Col>
                </SkillRow>
              </Col>
              <div>
                <button onClick={this.handleInitialize(props)}>初期化</button>
                <button>作る</button>
              </div>
              <div>{d(props.values)}</div>
            </form>
          );
        }}
      />
    );
  }

  private handleInitialize = props => {
    return event => {
      event.preventDefault();
      const { batch, change } = props.form;
      batch(() => {
        const STR = dice.roll3D6();
        change('STR', STR);
        const CON = dice.roll3D6();
        change('CON', CON);
        const POW = dice.roll3D6();
        change('POW', POW);
        change('DEX', dice.roll3D6());
        change('APP', dice.roll3D6());
        const INT = dice.roll2D6() + 6;
        change('INT', INT);
        const SIZ = dice.roll2D6() + 6;
        change('SIZ', SIZ);
        const EDU = dice.roll3D6() + 3;
        change('EDU', EDU);
        const SAN = POW * 5;
        change('SAN', SAN);
        change('アイデア', INT * 5);
        change('幸運', POW * 5);
        change('知識', EDU * 5);
        change('ダメージボーナス', this.computeDamageBonus(STR, SIZ));
        change('最大正気度', 99);
        change('正気度ポイント', SAN);
        change('マジックポイント', POW);
        change('耐久力', Math.ceil((CON + SIZ) / 2));
      });
    };
  };

  private computeDamageBonus(STR: number, SIZ: number): number {
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

  private handleSubmit = async (values: object) => {
    console.log(values);
    const character = {
      ...(values as Character),
      uid: currentUser().uid
    };
    await this.props.c.create(character);
  };
}

export default () => (
  <Subscribe to={[NewContainer, AppContainer]}>
    {(c: NewContainer, app: typeof AppContainer) => <New {...{ c, app }} />}
  </Subscribe>
);
