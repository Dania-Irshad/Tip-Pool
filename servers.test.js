describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update #serverTable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();

    let tdList = document.querySelectorAll('#serverTable tbody tr td');
    expect(tdList.length).toEqual(3);
    expect(tdList[0].innerText).toEqual('Alice');
    expect(tdList[1].innerText).toEqual('$0.00');
    
  });

  afterEach(function() {
    serverNameInput.value = '';
    allServers = {};
    serverId = 0;
    serverTbody.innerHTML = '';
  });
});
