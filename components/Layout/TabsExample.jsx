import Nav from 'react-bootstrap/Nav';
import BooksList from '../admin/Book/controller/BooksList';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabsExample() {
  return (
    <Tabs
      defaultActiveKey="Book"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Book" title="Book">
        <BooksList />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default TabsExample;