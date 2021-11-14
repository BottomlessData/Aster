// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Task{
    //declare required variables
    address public taskOwner;
    address payable manager = payable(0x83cB1abd58BAc27DFE9843BcEF6960E0b0EA5Af9);
    uint numLabelers;
    uint TaskId;
    bool TaskOpen;
    uint256 totalAmount;
    uint256 rewardPerLabeler;
    uint256 fees;

    constructor(uint TID, address tOwner, uint nLabelers, uint256 amount){     
        // initialize variables
        taskOwner = tOwner;
        TaskId = TID;
        TaskOpen = true;
        numLabelers = nLabelers;
        totalAmount = amount;
    }
    
    function fundTask() public payable{
        require(msg.value == totalAmount, "Task: Unmatching funds.");
        
        //transfer to money to this SC address
        payable(address(this)).transfer(msg.value);
    
    }
    
    function feeCalculations() private {
        //5% of total amount is collected as process fees
        fees = (5 * totalAmount)/100;
        
        //update totalAmount after paying fees
        totalAmount = totalAmount - fees;
        
        //reward per each labeler
        rewardPerLabeler = totalAmount / numLabelers;
    }
    
    
    function payLabeler(address payable labeler) public{
        require(TaskOpen == true, "Task is closed.");
    
        //transfer stars to this contract with amount entered.
        labeler.transfer(rewardPerLabeler);
        
        //update totalAmount
        totalAmount = totalAmount - rewardPerLabeler;
    }
    
    
//------------HELPER FUNCTIONS------------------------
    
    //get balance of Task SC
    function getTaskBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function getTaskID() public view returns(uint){
        return TaskId;
    }
    
    function getNumLabelers() public view returns(uint){
        return numLabelers;
    }
        
    function getTotalAmount() public view returns(uint256){
        return totalAmount;
    }
        
    //get state of the Task 
    function getTaskState() public view returns(bool){
        return TaskOpen;
    }
    
    //get balance of the sender 
    function getBalance() public view returns(uint256){
        return msg.sender.balance;
    }
    
    
}

