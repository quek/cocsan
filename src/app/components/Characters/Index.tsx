import { Subscribe } from 'unstated';
import IndexContainer from './IndexContainer';

const Index = ({ c }: { c: IndexContainer }) => (
  <div>
    <ul>
      {c.state.characters.map((character, index) => (
        <li key={index}>{character.name}</li>
      ))}
    </ul>
  </div>
);

export default () => (
  <Subscribe to={[IndexContainer]}>{c => <Index {...{ c }} />}</Subscribe>
);
