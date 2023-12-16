import { Footer } from 'antd/es/layout/layout';

export default function TodoFooter() {
  return (
    <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
      Brandon Blankenstein - <a href="https://www.blankenstein.dev" target="_blank">blankenstein.dev</a>
    </Footer>
  );
}