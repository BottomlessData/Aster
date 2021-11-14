// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./Task.sol";

contract TaskFactory{
    address public manager;
    address[] public tasks;
    uint id;
    
        
    //announcements
    event newTaskCreation(uint id, address taskAdd);
    
    constructor() {
        manager = msg.sender;
    }
    
    //backend calls to create a Task SC
    function create(address taskOwner, uint numLabelers, uint256 totalAmount) public returns(address, uint){
        require(manager == msg.sender, "TaskFactory: permission denied.");
        
        id = tasks.length;
        Task newtask = new Task(id, taskOwner, numLabelers, totalAmount);
        
        tasks.push(address(newtask));
        
        emit newTaskCreation(id, address(newtask));

        return (address(newtask), id);
    }

//------------HELPER FUNCTIONS------------------------


    function getAddress(uint _id) public returns(address){
        // require(manager == msg.sender, "TaskFactory: permission denied.");
        return tasks[_id];
    }

    function getNumDeployedTasks() public returns(uint){
        // require(manager == msg.sender, "TaskFactory: permission denied.");
        return tasks.length;
    }
    
    
}