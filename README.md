# 🔴🟡 CONECTA 4 

### *Context: I just wanted to create a game to improve my knowledge using TypeScript to programming.* 

### 🎮 HOW TO PLAY PLAYER VS PLAYER
#### 1. The red pieces start, followed by the yellow pieces and so on until a tie or a victory for one of the two players is achieved.
#### 2. There are only four ways to make `"four in a row"`: vertically ⬆️, horizontally ⬅️➡️, diagonally to the left ↖️↙️, and diagonally to the right ↘️↗️.
#### 3. A tie occurs when there are no empty spaces left and no player has made `"four in a row"`.
#### 4. There is a victory when one of the players has made `"four in a row"`.


### 🤖 HOW TO PLAY PLAYER VS ROBOT
#### *They are basically the same rules as in PvP, except that now the red ones start and immediately after a pink box will be marked, which will be the robot's movement.*

### ⚙️ HOW DOES THE ROBOT WORKS?
#### The robot identifies your move and where you placed your piece. If your move leaves you one or two moves away from making a four-in-a-row, the robot automatically creates a kind of "blockade" of possible spaces that could have given you the win.
#### If at any point the robot detects that you might be close to winning, either due to a mistake or because you actually are, it chooses a random space to place its piece or positions it so that it can also make a four-in-a-row.
