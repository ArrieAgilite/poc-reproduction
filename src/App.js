import React from 'react';
import './index.css';
import { Table, Button, Modal, Input, Form } from 'antd';

let data = [];
const dataTemplate = {
  key: "",
  groupName: "",
  isActive: true
}

let tempData = {};

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      modalVisible: false,
      filters: []
    }
  }

  modalOpen = () => {
    this.setState({modalVisible: true});
    tempData = JSON.parse(JSON.stringify(dataTemplate));
  }

  saveRecord = () => {
    let tmpArray = this.state.filters;

    // Push profile to data array
    data.push(tempData);

    // Push filter object to filters array
    tmpArray.push({text: tempData.groupName, value: tempData.groupName});
    this.setState({filters: tmpArray, modalVisible: false});

    tempData = {};
  }

  onChange = (key, value) => {
    tempData[key] = value;
  }

  render() {
    const columns = [
      {
        title: 'Profile Key',
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: 'Group Name',
        dataIndex: 'groupName',
        key: 'groupName',
        filters: this.state.filters,
        onFilter: (value, record) => {
          return record.groupName.includes(value)
        }
      },
      {
        title: 'Is Active',
        dataIndex: 'isActive',
        key: 'isActive'
      },
    ];
    return (
      <div>
        <Button
          style={{margin: 20}}
          type="primary"
          onClick={() => {
            this.modalOpen();
          }}
        >
          Create Profile
        </Button>
        <Table columns={columns} dataSource={data} style={{margin: 20}} bordered pagination={false} />
        <Modal
          okText="Submit"
          onOk={() => {
            this.saveRecord();
          }}
          closable={false}
          onCancel={() => {
            this.setState({modalVisible: false})
          }}
          visible={this.state.modalVisible}
          destroyOnClose={true}
        >
          <Form>
            <Form.Item>
              Profile Key
              <Input 
                type="text"
                placeholder="Profile Key"
                required={true}
                onChange={(e) => {
                  this.onChange("key", e.target.value)
                }}
              />
            </Form.Item>
            <Form.Item>
                Group Name
              <Input 
                type="text"
                placeholder="Group Name"
                required={true}
                onChange={(e) => {
                  this.onChange("groupName", e.target.value)
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default App;
          