class Caves extends Phaser.Scene {

    constructor() {
        super("caves");
    }

    init() {
        // ===== DRILL SAVE =====
        // nombre de joueur
        // liste des joeurs
        // minerais possédé par les joueurs
        // pv restant
        // toute les upgrade faites
        // état précédent de la drill

        // ===== MAP GENERATION =====
        // max hauteur
        // max largeur
        // tile du biome utilisé
        // bruit 
        // réduction du bruit

    }

    preload() {

        // ====== SPRITE ======

        this.load.spritesheet("persoA", "../sprites/characterA.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoB", "../sprites/characterB.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoC", "../sprites/characterC.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoD", "../sprites/characterD.png", { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet("Dridrill", "../sprites/drill.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("porteA", "../sprites/mapSprite/spawnDoor.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteB", "../sprites/mapSprite/spawnDoorB.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteC", "../sprites/mapSprite/spawnDoorC.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteD", "../sprites/mapSprite/spawnDoorD.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("doorOut", "../sprites/mapSprite/doorOut.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("porteDrillA", "../sprites/mapSprite/drillDoorA.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("porteDrillB", "../sprites/mapSprite/drillDoorB.png", { frameWidth: 32, frameHeight: 48 });

        this.load.spritesheet("ready", "../sprites/startingTXT.png", { frameWidth: 256, frameHeight: 96 });
        this.load.spritesheet("Upgrade_Drill", "../sprites/ui_Upgrade_Drill.png", { frameWidth: 80, frameHeight: 48 });

        this.load.spritesheet("Hey", "../sprites/UI/interactible.png", { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("fuelA", "../sprites/UI/drillUsage.png", { frameWidth: 48, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.spritesheet("Tiles", "../sprites/tileSet/proceduralGen.png", { frameWidth: 16, frameHeight: 16 });

        // ===== VAR =====
        // camera
        this.posA_x
        this.posA_y
        this.posB_x
        this.posB_y
        this.posC_x
        this.posC_y
        this.posD_x
        this.posD_y

        //Upgrades :
        this.warnerA = false
        this.used1 = false
        this.selection1 = 0
        this.drill_Speed = 0
        this.drill_Yield = 0

        this.lampLevel = 0 // 0/3
        this.scafoldingLevel = 0 // 0/3

        this.used2 = false

        //players stats :
        this.gravityA = 0
        this.gravityB = 0
        this.gravityC = 0
        this.gravityD = 0

        //map var :
        this.door_3 = false
        this.door_2 = false
        this.door_1 = false
        this.door_0 = false

        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.gadgetSelected1 = 1

        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)

        this.key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT)
        this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR)
        this.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE)
        this.key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX)
        this.key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN)
        this.key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE)

        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
        this.keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

        // > debug
        this.__debug = false
        this.__state = false
        this.__cam = false
    }

    create() {

        // ===== GROUPS =====
        this.players = this.physics.add.group({
            allowGravity: false,
        });

        this.ground = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.ore = this.physics.add.group({
        });

        this.dridrills = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.object = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        this.biome = 0              // 0 1 2 / 3 4 5 / 6 7 8 / 9 10

        // ===== VAR =====
        this.map_Height = 3.5         //3
        this.map_Length = 200       //150
        this.map_Noise = 1          //1
        this.map_Smooth = 3         //3
        this.map_clif = 2           //1

        this.ore_Rarity = 100        //40
        this.ore_red = true
        this.ore_blue = true
        this.ore_green = true

        this.rnd
        this.noise = 1

        // TEST

        // > create layers
        // botom > top


        // > setup layers value
        // first layer 


        console.log(" BOTOP TO TOP")
        this.layer0 = []; for (var i = 0; i < this.map_Length; i += Phaser.Math.Between(1, this.map_Smooth)) { if (Phaser.Math.Between(0, 1) > 0 && this.noise < this.map_Height * 3) { this.noise += Phaser.Math.Between(1, this.map_clif) } /* add value */else if (this.noise != 0) { this.noise -= 1 } /* retrieve value*/this.layer0[i] = this.noise + this.map_Height /*apply base value*/ };// generate raw value 
        console.log(this.layer0)
        for (var i = 0; i < this.map_Length; i++) { if (this.layer0[i] == null) { this.layer0[i] = this.layer0[i - 1] } } // apply raw value to nearby null value
        console.log(this.layer0)

        // other layer
        this.layer1 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer0[i] - this.rnd > 0) { this.layer1[i] = this.layer0[i] - this.rnd } else { this.layer1[i] = 0 } }; console.log("layer 1", this.layer1)
        this.layer2 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer1[i] - this.rnd > 0) { this.layer2[i] = this.layer1[i] - this.rnd } else { this.layer2[i] = 0 } }; console.log("layer 2", this.layer2)
        this.layer3 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer2[i] - this.rnd > 0) { this.layer3[i] = this.layer2[i] - this.rnd } else { this.layer3[i] = 0 } }; console.log("layer 3", this.layer3)
        this.layer4 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer3[i] - this.rnd > 0) { this.layer4[i] = this.layer3[i] - this.rnd } else { this.layer4[i] = 0 } }; console.log("layer 4", this.layer4)
        this.layer5 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer4[i] - this.rnd > 0) { this.layer5[i] = this.layer4[i] - this.rnd } else { this.layer5[i] = 0 } }; console.log("layer 5", this.layer5)
        this.layer6 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer5[i] - this.rnd > 0) { this.layer6[i] = this.layer5[i] - this.rnd } else { this.layer6[i] = 0 } }; console.log("layer 6", this.layer6)
        this.layer7 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer6[i] - this.rnd > 0) { this.layer7[i] = this.layer6[i] - this.rnd } else { this.layer7[i] = 0 } }; console.log("layer 7", this.layer7)
        this.layer8 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer7[i] - this.rnd > 0) { this.layer8[i] = this.layer7[i] - this.rnd } else { this.layer8[i] = 0 } }; console.log("layer 8", this.layer8)
        this.layer9 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer8[i] - this.rnd > 0) { this.layer9[i] = this.layer8[i] - this.rnd } else { this.layer9[i] = 0 } }; console.log("layer 9", this.layer9)
        this.layer10 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer9[i] - this.rnd > 0) { this.layer10[i] = this.layer9[i] - this.rnd } else { this.layer10[i] = 0 } }; console.log("layer 10", this.layer10)
        this.layer11 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer10[i] - this.rnd > 0) { this.layer11[i] = this.layer10[i] - this.rnd } else { this.layer11[i] = 0 } }; console.log("layer 11", this.layer11)
        this.layer12 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer11[i] - this.rnd > 0) { this.layer12[i] = this.layer11[i] - this.rnd } else { this.layer12[i] = 0 } }; console.log("layer 12", this.layer12)
        this.layer13 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer12[i] - this.rnd > 0) { this.layer13[i] = this.layer12[i] - this.rnd } else { this.layer13[i] = 0 } }; console.log("layer 13", this.layer13)
        this.layer14 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer13[i] - this.rnd > 0) { this.layer14[i] = this.layer13[i] - this.rnd } else { this.layer14[i] = 0 } }; console.log("layer 14", this.layer14)
        this.layer15 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer14[i] - this.rnd > 0) { this.layer15[i] = this.layer14[i] - this.rnd } else { this.layer15[i] = 0 } }; console.log("layer 15", this.layer15)
        this.layer16 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer15[i] - this.rnd > 0) { this.layer16[i] = this.layer15[i] - this.rnd } else { this.layer16[i] = 0 } }; console.log("layer 16", this.layer16)
        this.layer17 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer16[i] - this.rnd > 0) { this.layer17[i] = this.layer16[i] - this.rnd } else { this.layer17[i] = 0 } }; console.log("layer 17", this.layer17)
        this.layer18 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer17[i] - this.rnd > 0) { this.layer18[i] = this.layer17[i] - this.rnd } else { this.layer18[i] = 0 } }; console.log("layer 18", this.layer18)
        this.layer19 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer18[i] - this.rnd > 0) { this.layer19[i] = this.layer18[i] - this.rnd } else { this.layer19[i] = 0 } }; console.log("layer 19", this.layer19)
        this.layer20 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer19[i] - this.rnd > 0) { this.layer20[i] = this.layer18[i] - this.rnd } else { this.layer20[i] = 0 } }; console.log("layer 20", this.layer20)
        this.layer21 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer20[i] - this.rnd > 0) { this.layer21[i] = this.layer18[i] - this.rnd } else { this.layer21[i] = 0 } }; console.log("layer 21", this.layer21)
        this.layer22 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer21[i] - this.rnd > 0) { this.layer22[i] = this.layer18[i] - this.rnd } else { this.layer22[i] = 0 } }; console.log("layer 22", this.layer22)
        this.layer23 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer22[i] - this.rnd > 0) { this.layer23[i] = this.layer18[i] - this.rnd } else { this.layer23[i] = 0 } }; console.log("layer 23", this.layer23)
        this.layer24 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer23[i] - this.rnd > 0) { this.layer24[i] = this.layer18[i] - this.rnd } else { this.layer24[i] = 0 } }; console.log("layer 24", this.layer24)
        this.layer25 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer24[i] - this.rnd > 0) { this.layer25[i] = this.layer18[i] - this.rnd } else { this.layer25[i] = 0 } }; console.log("layer 25", this.layer25)
        this.layer26 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer25[i] - this.rnd > 0) { this.layer26[i] = this.layer18[i] - this.rnd } else { this.layer26[i] = 0 } }; console.log("layer 26", this.layer26)
        this.layer27 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer26[i] - this.rnd > 0) { this.layer27[i] = this.layer18[i] - this.rnd } else { this.layer27[i] = 0 } }; console.log("layer 27", this.layer27)
        this.layer28 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer27[i] - this.rnd > 0) { this.layer28[i] = this.layer18[i] - this.rnd } else { this.layer28[i] = 0 } }; console.log("layer 28", this.layer28)
        this.layer29 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer28[i] - this.rnd > 0) { this.layer29[i] = this.layer18[i] - this.rnd } else { this.layer29[i] = 0 } }; console.log("layer 29", this.layer29)
        this.layer30 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer29[i] - this.rnd > 0) { this.layer30[i] = this.layer18[i] - this.rnd } else { this.layer30[i] = 0 } }; console.log("layer 30", this.layer30)
        this.layer31 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer30[i] - this.rnd > 0) { this.layer31[i] = this.layer18[i] - this.rnd } else { this.layer31[i] = 0 } }; console.log("layer 31", this.layer31)
        this.layer32 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer31[i] - this.rnd > 0) { this.layer32[i] = this.layer18[i] - this.rnd } else { this.layer32[i] = 0 } }; console.log("layer 32", this.layer32)
        this.layer33 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer32[i] - this.rnd > 0) { this.layer33[i] = this.layer18[i] - this.rnd } else { this.layer33[i] = 0 } }; console.log("layer 33", this.layer33)
        this.layer34 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer33[i] - this.rnd > 0) { this.layer34[i] = this.layer18[i] - this.rnd } else { this.layer34[i] = 0 } }; console.log("layer 34", this.layer34)
        this.layer35 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer34[i] - this.rnd > 0) { this.layer35[i] = this.layer18[i] - this.rnd } else { this.layer35[i] = 0 } }; console.log("layer 35", this.layer35)
        this.layer36 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer35[i] - this.rnd > 0) { this.layer36[i] = this.layer18[i] - this.rnd } else { this.layer36[i] = 0 } }; console.log("layer 36", this.layer36)
        this.layer37 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer36[i] - this.rnd > 0) { this.layer37[i] = this.layer18[i] - this.rnd } else { this.layer37[i] = 0 } }; console.log("layer 37", this.layer37)
        this.layer38 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer37[i] - this.rnd > 0) { this.layer38[i] = this.layer18[i] - this.rnd } else { this.layer38[i] = 0 } }; console.log("layer 38", this.layer38)
        this.layer39 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer38[i] - this.rnd > 0) { this.layer39[i] = this.layer18[i] - this.rnd } else { this.layer39[i] = 0 } }; console.log("layer 39", this.layer39)

        // top > botom

        this.rnd
        this.noise = 1

        console.log(" TOP TO BOTTOM")
        // > setup layers value
        // first layer 
        this.layer40 = []; for (var i = 0; i < this.map_Length; i += Phaser.Math.Between(1, this.map_Smooth)) { if (Phaser.Math.Between(0, 1) > 0 && this.noise < this.map_Height * 3) { this.noise += Phaser.Math.Between(1, this.map_clif) } /* add value */else if (this.noise != 0) { this.noise -= 1 } /* retrieve value*/this.layer40[i] = this.noise + this.map_Height /*apply base value*/ };// generate raw value 
        console.log(this.layer40)
        for (var i = 0; i < this.map_Length; i++) { if (this.layer40[i] == null) { this.layer40[i] = this.layer40[i - 1] } } // apply raw value to nearby null value
        console.log(this.layer40)

        this.layer41 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer40[i] - this.rnd > 0) { this.layer41[i] = this.layer40[i] - this.rnd } else { this.layer41[i] = 0 } }; console.log("layer 21", this.layer41)
        this.layer42 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer41[i] - this.rnd > 0) { this.layer42[i] = this.layer41[i] - this.rnd } else { this.layer42[i] = 0 } }; console.log("layer 22", this.layer42)
        this.layer43 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer42[i] - this.rnd > 0) { this.layer43[i] = this.layer42[i] - this.rnd } else { this.layer43[i] = 0 } }; console.log("layer 23", this.layer43)
        this.layer44 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer43[i] - this.rnd > 0) { this.layer44[i] = this.layer43[i] - this.rnd } else { this.layer44[i] = 0 } }; console.log("layer 24", this.layer44)
        this.layer45 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer44[i] - this.rnd > 0) { this.layer45[i] = this.layer44[i] - this.rnd } else { this.layer45[i] = 0 } }; console.log("layer 25", this.layer45)
        this.layer46 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer45[i] - this.rnd > 0) { this.layer46[i] = this.layer45[i] - this.rnd } else { this.layer46[i] = 0 } }; console.log("layer 26", this.layer46)
        this.layer47 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer46[i] - this.rnd > 0) { this.layer47[i] = this.layer46[i] - this.rnd } else { this.layer47[i] = 0 } }; console.log("layer 27", this.layer47)
        this.layer48 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer47[i] - this.rnd > 0) { this.layer48[i] = this.layer47[i] - this.rnd } else { this.layer48[i] = 0 } }; console.log("layer 28", this.layer48)
        this.layer49 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer48[i] - this.rnd > 0) { this.layer49[i] = this.layer48[i] - this.rnd } else { this.layer49[i] = 0 } }; console.log("layer 29", this.layer49)
        this.layer50 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer49[i] - this.rnd > 0) { this.layer50[i] = this.layer49[i] - this.rnd } else { this.layer50[i] = 0 } }; console.log("layer 30", this.layer50)
        this.layer51 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer50[i] - this.rnd > 0) { this.layer51[i] = this.layer50[i] - this.rnd } else { this.layer51[i] = 0 } }; console.log("layer 31", this.layer51)
        this.layer52 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer51[i] - this.rnd > 0) { this.layer52[i] = this.layer51[i] - this.rnd } else { this.layer52[i] = 0 } }; console.log("layer 32", this.layer52)
        this.layer53 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer52[i] - this.rnd > 0) { this.layer53[i] = this.layer52[i] - this.rnd } else { this.layer53[i] = 0 } }; console.log("layer 33", this.layer53)
        this.layer54 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer53[i] - this.rnd > 0) { this.layer54[i] = this.layer53[i] - this.rnd } else { this.layer54[i] = 0 } }; console.log("layer 34", this.layer54)
        this.layer55 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer54[i] - this.rnd > 0) { this.layer55[i] = this.layer54[i] - this.rnd } else { this.layer55[i] = 0 } }; console.log("layer 35", this.layer55)
        this.layer56 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer55[i] - this.rnd > 0) { this.layer56[i] = this.layer55[i] - this.rnd } else { this.layer56[i] = 0 } }; console.log("layer 36", this.layer56)
        this.layer57 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer56[i] - this.rnd > 0) { this.layer57[i] = this.layer56[i] - this.rnd } else { this.layer57[i] = 0 } }; console.log("layer 37", this.layer57)
        this.layer58 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer57[i] - this.rnd > 0) { this.layer58[i] = this.layer57[i] - this.rnd } else { this.layer58[i] = 0 } }; console.log("layer 38", this.layer58)
        this.layer59 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer58[i] - this.rnd > 0) { this.layer59[i] = this.layer58[i] - this.rnd } else { this.layer59[i] = 0 } }; console.log("layer 39", this.layer59)
        this.layer60 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer59[i] - this.rnd > 0) { this.layer60[i] = this.layer59[i] - this.rnd } else { this.layer60[i] = 0 } }; console.log("layer 39", this.layer60)
        this.layer61 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer60[i] - this.rnd > 0) { this.layer61[i] = this.layer60[i] - this.rnd } else { this.layer61[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer62 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer61[i] - this.rnd > 0) { this.layer62[i] = this.layer61[i] - this.rnd } else { this.layer62[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer63 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer62[i] - this.rnd > 0) { this.layer63[i] = this.layer62[i] - this.rnd } else { this.layer63[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer64 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer63[i] - this.rnd > 0) { this.layer64[i] = this.layer63[i] - this.rnd } else { this.layer64[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer65 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer64[i] - this.rnd > 0) { this.layer65[i] = this.layer64[i] - this.rnd } else { this.layer65[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer66 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer65[i] - this.rnd > 0) { this.layer66[i] = this.layer65[i] - this.rnd } else { this.layer66[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer67 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer66[i] - this.rnd > 0) { this.layer67[i] = this.layer66[i] - this.rnd } else { this.layer67[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer68 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer67[i] - this.rnd > 0) { this.layer68[i] = this.layer67[i] - this.rnd } else { this.layer68[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer69 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer68[i] - this.rnd > 0) { this.layer69[i] = this.layer68[i] - this.rnd } else { this.layer69[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer70 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer69[i] - this.rnd > 0) { this.layer70[i] = this.layer69[i] - this.rnd } else { this.layer70[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer71 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer70[i] - this.rnd > 0) { this.layer71[i] = this.layer70[i] - this.rnd } else { this.layer71[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer72 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer71[i] - this.rnd > 0) { this.layer72[i] = this.layer71[i] - this.rnd } else { this.layer72[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer73 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer72[i] - this.rnd > 0) { this.layer73[i] = this.layer72[i] - this.rnd } else { this.layer73[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer74 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer73[i] - this.rnd > 0) { this.layer74[i] = this.layer73[i] - this.rnd } else { this.layer74[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer75 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer74[i] - this.rnd > 0) { this.layer75[i] = this.layer74[i] - this.rnd } else { this.layer75[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer76 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer75[i] - this.rnd > 0) { this.layer76[i] = this.layer75[i] - this.rnd } else { this.layer76[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer77 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer76[i] - this.rnd > 0) { this.layer77[i] = this.layer76[i] - this.rnd } else { this.layer77[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer78 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer77[i] - this.rnd > 0) { this.layer78[i] = this.layer77[i] - this.rnd } else { this.layer78[i] = 0 } }; console.log("layer 39", this.layer39)
        this.layer79 = []; for (var i = 0; i < this.map_Length; i++) { this.rnd = Phaser.Math.Between(1, this.map_Noise); if (this.layer78[i] - this.rnd > 0) { this.layer79[i] = this.layer78[i] - this.rnd } else { this.layer79[i] = 0 } }; console.log("layer 39", this.layer39)


        // merge up and down
        this.line1 = []; for (var i = 0; i < this.map_Length; i++) { this.line1[i] = this.layer0[i] + this.layer79[i] }; console.log("line 1", this.line1)
        this.line2 = []; for (var i = 0; i < this.map_Length; i++) { this.line2[i] = this.layer1[i] + this.layer78[i] }; console.log("line 2", this.line2)
        this.line3 = []; for (var i = 0; i < this.map_Length; i++) { this.line3[i] = this.layer2[i] + this.layer77[i] }; console.log("line 3", this.line3)
        this.line4 = []; for (var i = 0; i < this.map_Length; i++) { this.line4[i] = this.layer3[i] + this.layer76[i] }; console.log("line 4", this.line4)
        this.line5 = []; for (var i = 0; i < this.map_Length; i++) { this.line5[i] = this.layer4[i] + this.layer75[i] }; console.log("line 5", this.line5)
        this.line6 = []; for (var i = 0; i < this.map_Length; i++) { this.line6[i] = this.layer5[i] + this.layer74[i] }; console.log("line 6", this.line6)
        this.line7 = []; for (var i = 0; i < this.map_Length; i++) { this.line7[i] = this.layer6[i] + this.layer73[i] }; console.log("line 7", this.line7)
        this.line8 = []; for (var i = 0; i < this.map_Length; i++) { this.line8[i] = this.layer7[i] + this.layer72[i] }; console.log("line 8", this.line8)
        this.line9 = []; for (var i = 0; i < this.map_Length; i++) { this.line9[i] = this.layer8[i] + this.layer71[i] }; console.log("line 9", this.line9)
        this.line10 = []; for (var i = 0; i < this.map_Length; i++) { this.line10[i] = this.layer9[i] + this.layer70[i] }; console.log("line 10", this.line10)
        this.line11 = []; for (var i = 0; i < this.map_Length; i++) { this.line11[i] = this.layer10[i] + this.layer69[i] }; console.log("line 11", this.line11)
        this.line12 = []; for (var i = 0; i < this.map_Length; i++) { this.line12[i] = this.layer11[i] + this.layer68[i] }; console.log("line 12", this.line12)
        this.line13 = []; for (var i = 0; i < this.map_Length; i++) { this.line13[i] = this.layer12[i] + this.layer67[i] }; console.log("line 13", this.line13)
        this.line14 = []; for (var i = 0; i < this.map_Length; i++) { this.line14[i] = this.layer13[i] + this.layer66[i] }; console.log("line 14", this.line14)
        this.line15 = []; for (var i = 0; i < this.map_Length; i++) { this.line15[i] = this.layer14[i] + this.layer65[i] }; console.log("line 15", this.line15)
        this.line16 = []; for (var i = 0; i < this.map_Length; i++) { this.line16[i] = this.layer15[i] + this.layer64[i] }; console.log("line 16", this.line16)
        this.line17 = []; for (var i = 0; i < this.map_Length; i++) { this.line17[i] = this.layer16[i] + this.layer63[i] }; console.log("line 17", this.line17)
        this.line18 = []; for (var i = 0; i < this.map_Length; i++) { this.line18[i] = this.layer17[i] + this.layer62[i] }; console.log("line 18", this.line18)
        this.line19 = []; for (var i = 0; i < this.map_Length; i++) { this.line19[i] = this.layer18[i] + this.layer61[i] }; console.log("line 19", this.line19)
        this.line20 = []; for (var i = 0; i < this.map_Length; i++) { this.line20[i] = this.layer20[i] + this.layer60[i] }; console.log("line 20", this.line20)
        this.line21 = []; for (var i = 0; i < this.map_Length; i++) { this.line21[i] = this.layer21[i] + this.layer59[i] }; console.log("line 21", this.line21)
        this.line22 = []; for (var i = 0; i < this.map_Length; i++) { this.line22[i] = this.layer22[i] + this.layer58[i] }; console.log("line 22", this.line22)
        this.line23 = []; for (var i = 0; i < this.map_Length; i++) { this.line23[i] = this.layer23[i] + this.layer57[i] }; console.log("line 23", this.line23)
        this.line24 = []; for (var i = 0; i < this.map_Length; i++) { this.line24[i] = this.layer24[i] + this.layer56[i] }; console.log("line 24", this.line24)
        this.line25 = []; for (var i = 0; i < this.map_Length; i++) { this.line25[i] = this.layer25[i] + this.layer55[i] }; console.log("line 25", this.line25)
        this.line26 = []; for (var i = 0; i < this.map_Length; i++) { this.line26[i] = this.layer26[i] + this.layer54[i] }; console.log("line 26", this.line26)
        this.line27 = []; for (var i = 0; i < this.map_Length; i++) { this.line27[i] = this.layer27[i] + this.layer53[i] }; console.log("line 27", this.line27)
        this.line28 = []; for (var i = 0; i < this.map_Length; i++) { this.line28[i] = this.layer28[i] + this.layer52[i] }; console.log("line 28", this.line28)
        this.line29 = []; for (var i = 0; i < this.map_Length; i++) { this.line29[i] = this.layer29[i] + this.layer51[i] }; console.log("line 29", this.line29)
        this.line30 = []; for (var i = 0; i < this.map_Length; i++) { this.line30[i] = this.layer30[i] + this.layer50[i] }; console.log("line 30", this.line30)
        this.line31 = []; for (var i = 0; i < this.map_Length; i++) { this.line31[i] = this.layer31[i] + this.layer49[i] }; console.log("line 31", this.line31)
        this.line32 = []; for (var i = 0; i < this.map_Length; i++) { this.line32[i] = this.layer32[i] + this.layer48[i] }; console.log("line 32", this.line32)
        this.line33 = []; for (var i = 0; i < this.map_Length; i++) { this.line33[i] = this.layer33[i] + this.layer47[i] }; console.log("line 33", this.line33)
        this.line34 = []; for (var i = 0; i < this.map_Length; i++) { this.line34[i] = this.layer34[i] + this.layer46[i] }; console.log("line 34", this.line34)
        this.line35 = []; for (var i = 0; i < this.map_Length; i++) { this.line35[i] = this.layer35[i] + this.layer45[i] }; console.log("line 35", this.line35)
        this.line36 = []; for (var i = 0; i < this.map_Length; i++) { this.line36[i] = this.layer36[i] + this.layer44[i] }; console.log("line 36", this.line36)
        this.line37 = []; for (var i = 0; i < this.map_Length; i++) { this.line37[i] = this.layer37[i] + this.layer43[i] }; console.log("line 1", this.line37)
        this.line38 = []; for (var i = 0; i < this.map_Length; i++) { this.line38[i] = this.layer38[i] + this.layer42[i] }; console.log("line 1", this.line38)
        this.line39 = []; for (var i = 0; i < this.map_Length; i++) { this.line39[i] = this.layer39[i] + this.layer41[i] }; console.log("line 1", this.line39)
        this.line40 = []; for (var i = 0; i < this.map_Length; i++) { this.line40[i] = this.layer40[i] + this.layer40[i] }; console.log("line 1", this.line40)






        // > show results
        for (var i = 0; i < this.map_Length; i++) { if (this.line1[i] > 0) { this.addTile((16 * i), 16 * 50) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line2[i] > 0) { this.addTile((16 * i), 16 * 49) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line3[i] > 0) { this.addTile((16 * i), 16 * 48) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line4[i] > 0) { this.addTile((16 * i), 16 * 47) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line5[i] > 0) { this.addTile((16 * i), 16 * 46) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line6[i] > 0) { this.addTile((16 * i), 16 * 45) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line7[i] > 0) { this.addTile((16 * i), 16 * 44) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line8[i] > 0) { this.addTile((16 * i), 16 * 43) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line9[i] > 0) { this.addTile((16 * i), 16 * 42) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line10[i] > 0) { this.addTile((16 * i), 16 * 41) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line11[i] > 0) { this.addTile((16 * i), 16 * 40) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line12[i] > 0) { this.addTile((16 * i), 16 * 39) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line13[i] > 0) { this.addTile((16 * i), 16 * 38) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line14[i] > 0) { this.addTile((16 * i), 16 * 37) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line15[i] > 0) { this.addTile((16 * i), 16 * 36) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line16[i] > 0) { this.addTile((16 * i), 16 * 35) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line17[i] > 0) { this.addTile((16 * i), 16 * 34) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line18[i] > 0) { this.addTile((16 * i), 16 * 33) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line19[i] > 0) { this.addTile((16 * i), 16 * 32) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line20[i] > 0) { this.addTile((16 * i), 16 * 31) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line21[i] > 0) { this.addTile((16 * i), 16 * 30) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line22[i] > 0) { this.addTile((16 * i), 16 * 29) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line23[i] > 0) { this.addTile((16 * i), 16 * 28) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line24[i] > 0) { this.addTile((16 * i), 16 * 27) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line25[i] > 0) { this.addTile((16 * i), 16 * 26) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line26[i] > 0) { this.addTile((16 * i), 16 * 25) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line27[i] > 0) { this.addTile((16 * i), 16 * 24) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line28[i] > 0) { this.addTile((16 * i), 16 * 23) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line29[i] > 0) { this.addTile((16 * i), 16 * 22) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line30[i] > 0) { this.addTile((16 * i), 16 * 21) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line31[i] > 0) { this.addTile((16 * i), 16 * 20) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line32[i] > 0) { this.addTile((16 * i), 16 * 19) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line33[i] > 0) { this.addTile((16 * i), 16 * 18) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line34[i] > 0) { this.addTile((16 * i), 16 * 17) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line35[i] > 0) { this.addTile((16 * i), 16 * 16) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line36[i] > 0) { this.addTile((16 * i), 16 * 15) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line37[i] > 0) { this.addTile((16 * i), 16 * 14) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line38[i] > 0) { this.addTile((16 * i), 16 * 13) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line39[i] > 0) { this.addTile((16 * i), 16 * 12) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line40[i] > 0) { this.addTile((16 * i), 16 * 11) } }


        //find free space on ground
        for (var i = 0; i < this.map_Length; i++) { if (this.line1[i] > 0 && this.line2[i] <= 0) { this.onTop(16 * i, 16 * 50) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line2[i] > 0 && this.line3[i] <= 0) { this.onTop(16 * i, 16 * 49) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line3[i] > 0 && this.line4[i] <= 0) { this.onTop(16 * i, 16 * 48) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line4[i] > 0 && this.line5[i] <= 0) { this.onTop(16 * i, 16 * 47) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line5[i] > 0 && this.line6[i] <= 0) { this.onTop(16 * i, 16 * 46) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line6[i] > 0 && this.line7[i] <= 0) { this.onTop(16 * i, 16 * 45) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line7[i] > 0 && this.line8[i] <= 0) { this.onTop(16 * i, 16 * 44) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line8[i] > 0 && this.line9[i] <= 0) { this.onTop(16 * i, 16 * 43) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line9[i] > 0 && this.line10[i] <= 0) { this.onTop(16 * i, 16 * 42) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line10[i] > 0 && this.line11[i] <= 0) { this.onTop(16 * i, 16 * 41) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line11[i] > 0 && this.line12[i] <= 0) { this.onTop(16 * i, 16 * 40) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line12[i] > 0 && this.line13[i] <= 0) { this.onTop(16 * i, 16 * 39) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line13[i] > 0 && this.line14[i] <= 0) { this.onTop(16 * i, 16 * 38) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line14[i] > 0 && this.line15[i] <= 0) { this.onTop(16 * i, 16 * 37) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line15[i] > 0 && this.line16[i] <= 0) { this.onTop(16 * i, 16 * 36) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line16[i] > 0 && this.line17[i] <= 0) { this.onTop(16 * i, 16 * 35) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line17[i] > 0 && this.line18[i] <= 0) { this.onTop(16 * i, 16 * 34) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line18[i] > 0 && this.line19[i] <= 0) { this.onTop(16 * i, 16 * 33) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line19[i] > 0 && this.line20[i] <= 0) { this.onTop(16 * i, 16 * 32) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line20[i] > 0 && this.line21[i] <= 0) { this.onTop(16 * i, 16 * 31) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line21[i] > 0 && this.line22[i] <= 0) { this.onTop(16 * i, 16 * 30) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line22[i] > 0 && this.line23[i] <= 0) { this.onTop(16 * i, 16 * 29) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line23[i] > 0 && this.line24[i] <= 0) { this.onTop(16 * i, 16 * 28) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line24[i] > 0 && this.line25[i] <= 0) { this.onTop(16 * i, 16 * 27) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line25[i] > 0 && this.line26[i] <= 0) { this.onTop(16 * i, 16 * 26) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line26[i] > 0 && this.line27[i] <= 0) { this.onTop(16 * i, 16 * 25) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line27[i] > 0 && this.line28[i] <= 0) { this.onTop(16 * i, 16 * 24) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line28[i] > 0 && this.line29[i] <= 0) { this.onTop(16 * i, 16 * 23) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line29[i] > 0 && this.line30[i] <= 0) { this.onTop(16 * i, 16 * 22) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line30[i] > 0 && this.line31[i] <= 0) { this.onTop(16 * i, 16 * 21) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line31[i] > 0 && this.line32[i] <= 0) { this.onTop(16 * i, 16 * 20) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line32[i] > 0 && this.line33[i] <= 0) { this.onTop(16 * i, 16 * 19) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line33[i] > 0 && this.line34[i] <= 0) { this.onTop(16 * i, 16 * 18) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line34[i] > 0 && this.line35[i] <= 0) { this.onTop(16 * i, 16 * 17) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line35[i] > 0 && this.line36[i] <= 0) { this.onTop(16 * i, 16 * 16) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line36[i] > 0 && this.line37[i] <= 0) { this.onTop(16 * i, 16 * 15) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line37[i] > 0 && this.line38[i] <= 0) { this.onTop(16 * i, 16 * 14) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line38[i] > 0 && this.line39[i] <= 0) { this.onTop(16 * i, 16 * 13) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line39[i] > 0 && this.line40[i] <= 0) { this.onTop(16 * i, 16 * 12) } }

        //find free space on roof
        for (var i = 0; i < this.map_Length; i++) { if (this.line39[i] <= 0 && this.lin40[i] > 0) { this.under(16 * i, 16 * 12) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line38[i] <= 0 && this.line39[i] > 0) { this.under(16 * i, 16 * 13) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line37[i] <= 0 && this.line38[i] > 0) { this.under(16 * i, 16 * 14) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line36[i] <= 0 && this.line37[i] > 0) { this.under(16 * i, 16 * 15) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line35[i] <= 0 && this.line36[i] > 0) { this.under(16 * i, 16 * 16) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line34[i] <= 0 && this.line35[i] > 0) { this.under(16 * i, 16 * 17) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line33[i] <= 0 && this.line34[i] > 0) { this.under(16 * i, 16 * 18) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line32[i] <= 0 && this.line33[i] > 0) { this.under(16 * i, 16 * 19) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line31[i] <= 0 && this.line32[i] > 0) { this.under(16 * i, 16 * 20) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line30[i] <= 0 && this.line31[i] > 0) { this.under(16 * i, 16 * 21) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line29[i] <= 0 && this.line30[i] > 0) { this.under(16 * i, 16 * 22) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line28[i] <= 0 && this.line29[i] > 0) { this.under(16 * i, 16 * 23) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line27[i] <= 0 && this.line28[i] > 0) { this.under(16 * i, 16 * 24) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line26[i] <= 0 && this.line27[i] > 0) { this.under(16 * i, 16 * 25) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line25[i] <= 0 && this.line26[i] > 0) { this.under(16 * i, 16 * 26) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line24[i] <= 0 && this.line25[i] > 0) { this.under(16 * i, 16 * 27) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line23[i] <= 0 && this.line24[i] > 0) { this.under(16 * i, 16 * 28) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line22[i] <= 0 && this.line23[i] > 0) { this.under(16 * i, 16 * 29) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line21[i] <= 0 && this.line22[i] > 0) { this.under(16 * i, 16 * 30) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line20[i] <= 0 && this.line21[i] > 0) { this.under(16 * i, 16 * 31) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line19[i] <= 0 && this.line20[i] > 0) { this.under(16 * i, 16 * 32) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line18[i] <= 0 && this.line19[i] > 0) { this.under(16 * i, 16 * 33) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line17[i] <= 0 && this.line18[i] > 0) { this.under(16 * i, 16 * 34) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line16[i] <= 0 && this.line17[i] > 0) { this.under(16 * i, 16 * 35) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line15[i] <= 0 && this.line16[i] > 0) { this.under(16 * i, 16 * 36) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line14[i] <= 0 && this.line15[i] > 0) { this.under(16 * i, 16 * 37) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line13[i] <= 0 && this.line14[i] > 0) { this.under(16 * i, 16 * 38) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line12[i] <= 0 && this.line13[i] > 0) { this.under(16 * i, 16 * 39) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line11[i] <= 0 && this.line12[i] > 0) { this.under(16 * i, 16 * 40) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line10[i] <= 0 && this.line11[i] > 0) { this.under(16 * i, 16 * 41) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line9[i] <= 0 && this.line10[i] > 0) { this.under(16 * i, 16 * 42) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line8[i] <= 0 && this.line9[i] > 0) { this.under(16 * i, 16 * 43) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line7[i] <= 0 && this.line8[i] > 0) { this.under(16 * i, 16 * 44) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line6[i] <= 0 && this.line7[i] > 0) { this.under(16 * i, 16 * 45) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line5[i] <= 0 && this.line6[i] > 0) { this.under(16 * i, 16 * 46) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line4[i] <= 0 && this.line5[i] > 0) { this.under(16 * i, 16 * 47) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line3[i] <= 0 && this.line4[i] > 0) { this.under(16 * i, 16 * 48) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line2[i] <= 0 && this.line3[i] > 0) { this.under(16 * i, 16 * 49) } }
        for (var i = 0; i < this.map_Length; i++) { if (this.line1[i] <= 0 && this.line2[i] > 0) { this.under(16 * i, 16 * 50) } }


        // center the game screen
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        // - - - Anims - - - 

        //characters :
        this.anims.create({
            key: 'PersoA_walk_left',
            frames: this.anims.generateFrameNumbers('persoA', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoA_walk_right',
            frames: this.anims.generateFrameNumbers('persoA', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoB_walk_left',
            frames: this.anims.generateFrameNumbers('persoB', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoB_walk_right',
            frames: this.anims.generateFrameNumbers('persoB', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoC_walk_left',
            frames: this.anims.generateFrameNumbers('persoC', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoC_walk_right',
            frames: this.anims.generateFrameNumbers('persoC', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoD_walk_left',
            frames: this.anims.generateFrameNumbers('persoD', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'PersoD_walk_right',
            frames: this.anims.generateFrameNumbers('persoD', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: 0
        });

        // drills
        this.anims.create({
            key: 'dridrillA1',
            frames: this.anims.generateFrameNumbers('Dridrill', { start: 1, end: 4 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'dridrillB1',
            frames: this.anims.generateFrameNumbers('Dridrill', { start: 8, end: 6 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'dridrillC1',
            frames: this.anims.generateFrameNumbers('Dridrill', { start: 11, end: 14 }),
            frameRate: 15,
            repeat: 0
        });

        // ===== objects =====
        // > camera 
        this.camCNTR = this.physics.add.sprite(400, 600).setSize(16, 16)

        // ===== CAMERA =====
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.camCNTR);
        this.cameras.main.setLerp(0.04, 0.04);

        // ===== players ======
        {
            this.player1 = this.physics.add.sprite(280, 500, 'persoA').setScale(0.95, 0.95);
            this.dridrill1 = this.physics.add.sprite(280, 500, 'Dridrill').setDepth(1).setSize(16, 10); this.dridrills.add(this.dridrill1)
            this.player1.setPipeline('Light2D');
            this.player1.body.setSize(16, 16);
            this.players.add(this.player1)
            this.chain_COL1 = this.physics.add.overlap(this.player1, this.chain, this.chainRide, null, this);
            this.plateformeCOL1 = this.physics.add.collider(this.player1, this.plateforme);
            this.persoA_state = 1
            this.player1READY = true
            this.playerAMOUNT = 1

            this.drillingA = this.physics.add.overlap(this.dridrills, this.ground, this.drilling, null, this); this.drillingA.active = false
        }

        // ===== LIGHT ====

        this.lumiere1 = this.lights.addLight(this.player1.body.x, this.player1.body.y).setIntensity(1).setColor(0xfff8cf);

        this.lights.enable().setAmbientColor(0x000000); // quand c'est pas éclairé

        // ===== COllIDER =====

        this.physics.add.collider(this.players, this.ground);
        this.physics.add.collider(this.players, this.ore, this.pickUp);

    }

    update() {
        //====== DEBUG ======
        if (this.__state || this.__debug) {
            console.log("states : \n J1 :", this.persoA_state, "\n J2 :", this.persoB_state, "\n J3 :", this.persoC_state, "\n J4 :", this.persoD_state)
        }

        // ===== Lights ===== 
        this.lumiere1.x = this.player1.body.x; this.lumiere1.y = this.player1.body.y

        //====== CAM ======
        this.zoomAmount = this.cameras.main.zoom

        if (this.player1READY) { this.Afar = Phaser.Math.Distance.Between(this.player1.x, this.player1.y + 50, this.camCNTR.x, this.camCNTR.y); } else (this.Afar = 0)
        if (this.player2READY) { this.Bfar = Phaser.Math.Distance.Between(this.player2.x, this.player2.y + 50, this.camCNTR.x, this.camCNTR.y); } else (this.Bfar = 0)
        if (this.player3READY) { this.Cfar = Phaser.Math.Distance.Between(this.player3.x, this.player3.y + 50, this.camCNTR.x, this.camCNTR.y); } else (this.Cfar = 0)
        if (this.player4READY) { this.Dfar = Phaser.Math.Distance.Between(this.player4.x, this.player4.y + 50, this.camCNTR.x, this.camCNTR.y); } else (this.Dfar = 0)


        if (this.Afar >= this.Bfar && this.Afar >= this.Cfar && this.Afar >= this.Dfar) { this.zoomTarget = this.Afar }
        else if (this.Bfar > this.Afar && this.Bfar > this.Cfar && this.Bfar >= this.Dfar) { this.zoomTarget = this.Bfar }
        else if (this.Cfar > this.Bfar && this.Cfar > this.Afar && this.Cfar >= this.Dfar) { this.zoomTarget = this.Cfar }
        else if (this.Dfar > this.Afar && this.Dfar > this.Bfar && this.Dfar >= this.Cfar) { this.zoomTarget = this.Dfar }

        this.zoom = (-this.zoomTarget / 60) + 5

        if (this.zoom < 1.7) { this.zoom = 1.7 } // cap min
        if (this.zoom > 5) { this.zoom = 5.3 } // cap max

        if (this.playerAMOUNT > 0) { this.cameras.main.setZoom(this.zoom); }

        // ====== PLAYER 1 ======

        // - - - moving - - -
        if (this.player1READY) {
            if (this.persoA_state == 0) {       // dead state

            }
            else if (this.persoA_state == 1) {  // "normal" state
                this.move(this.keyZ, this.keyS, this.keyQ, this.keyD, this.player1, 150)

                //vertical
                if (this.keyZ.isDown && this.player1.body.blocked.down && this.keyA.isUp) {
                    this.gravityA = -200
                }
                else if (this.player1.body.blocked.down) { this.gravityA = 30 }
                else {
                    this.player1.setVelocityY(this.gravityA)
                    if (this.gravityA < 500) { this.gravityA += 20 }
                }
                this.gloom = this.placeGadget(this.gadgetSelected1,this.player1,this.gloom)
            }

            else if (this.persoA_state == 2) {  // ladder state

                this.ladder_state(this.keyZ, this.keyS, this.player1, 150)
                this.physics.world.remove(this.chain_COL1)

                this.physics.world.removeCollider(this.plateformeCOL1);
                this.chain_COL1 = 0
                this.gravityA = - 50

                if (this.keyZ.isDown || this.keyS.isDown) {
                    this.player1.anims.play('PersoA_climb', true);
                }

                if (this.keyD.isDown || this.keyQ.isDown) {

                    this.persoA_state = 1;
                    this.gravityA = -200
                    this.time.addEvent({
                        delay: 250, callback: () => {
                            this.chain_COL1 = this.physics.add.overlap(this.player1, this.chain, this.chainRide, null, this);
                            this.plateformeCOL1 = this.physics.add.collider(this.player1, this.plateforme);
                        },
                    })
                }
            }
            else if (this.persoA_state == 3) {  // mini game state
            }


            // - - - drill 1 - - - 
            if (this.keyZ.isDown && this.keyA.isDown) {
                this.dridrill1.setSize(10, 16)
                this.dridrill1.anims.play("dridrillC1", true)
                this.dridrill1.body.x = this.player1.body.x + 3
                this.dridrill1.body.y = this.player1.body.y - 8
            }
            else {
                this.dridrill1.setSize(16, 10)
                if (this.LRa) {

                    this.dridrill1.body.x = this.player1.body.x - 5
                    this.dridrill1.body.y = this.player1.body.y + 5
                    if (this.keyA.isDown) {
                        this.dridrill1.anims.play("dridrillB1", true)
                        this.drillingA.active = true
                    }
                    this.keyA.on('up', () => { this.drillingA.active = false });
                }
                else {

                    this.dridrill1.body.x = this.player1.body.x + 5
                    this.dridrill1.body.y = this.player1.body.y + 5
                    if (this.keyA.isDown) {
                        this.dridrill1.anims.play("dridrillA1", true)
                        this.drillingA.active = true
                    }
                    this.keyA.on('up', () => { this.drillingA.active = false });
                }
            }


            if (this.keyD.isDown && this.keyA.isUp) { this.dridrill1.setFrame(0) }
            if (this.keyQ.isDown && this.keyA.isUp) { this.dridrill1.setFrame(9) }
        }



        // ====== CAM CENTER =====
        if (this.player1READY == true) { this.posA_x = this.player1.body.x; this.posA_y = this.player1.body.y; } else { this.posA_x = 0; this.posA_y = 0 }
        if (this.player2READY == true) { this.posB_x = this.player2.body.x; this.posB_y = this.player2.body.y; } else { this.posB_x = 0; this.posB_y = 0 }
        if (this.player3READY == true) { this.posC_x = this.player3.body.x; this.posC_y = this.player3.body.y; } else { this.posC_x = 0; this.posC_y = 0 }
        if (this.player4READY == true) { this.posD_x = this.player4.body.x; this.posD_y = this.player4.body.y; } else { this.posD_x = 0; this.posD_y = 0 }

        if (this.playerAMOUNT > 0) {
            this.camCNTR.body.x = (this.posA_x + this.posB_x + this.posC_x + this.posD_x) / this.playerAMOUNT
            this.camCNTR.body.y = (this.posA_y + this.posB_y + this.posC_y + this.posD_y) / this.playerAMOUNT
            if (this.__debug == true || this.__cam == true) { console.log(" ", "camm coordinate x:", this.camCNTR.body.x, "(", this.posA_x, "+", this.posB_x, "+", this.posC_x, ") / ", this.playerAMOUNT, "\n", "camm coordinate y:", this.camCNTR.body.y, "(", this.posA_y, "+", this.posB_y, "+", this.posC_y, ") / ", this.playerAMOUNT) }
        }
    }

    move(up, down, left, right, target, speed) {
        //horizontal
        if (right.isDown) { // walk right
            if (target.body.velocity.x < speed) { target.body.velocity.x += 10.1 }

            if (target == this.player1) { target.anims.play('PersoA_walk_right', true); this.LRa = false; }
            if (target == this.player2) { target.anims.play('PersoB_walk_right', true); this.LRb = false; }
            if (target == this.player3) { target.anims.play('PersoC_walk_right', true); this.LRc = false; }
            if (target == this.player4) { target.anims.play('PersoD_walk_right', true); this.LRc = false; }

        }
        else if (left.isDown) { // walk left
            if (target.body.velocity.x > -speed) { target.body.velocity.x -= 10.1 }

            if (target == this.player1) { target.anims.play('PersoA_walk_left', true); this.LRa = true; }
            if (target == this.player2) { target.anims.play('PersoB_walk_left', true); this.LRb = true; }
            if (target == this.player3) { target.anims.play('PersoC_walk_left', true); this.LRc = true; }
            if (target == this.player4) { target.anims.play('PersoD_walk_left', true); this.LRc = true; }
        }
        else { // stop the player when idle
            if (target.body.velocity.x > 1) { target.body.velocity.x -= 7 }
            if (target.body.velocity.x < -1) { target.body.velocity.x += 7.3 }
            if (target.body.velocity.x > -1 && target.body.velocity.x < 1) { target.setVelocityX(0) }
        }
    }

    addTile(x, y) {

        if (this.biome == 0 || this.biome == 1 || this.biome == 2) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(0, 3)).setPipeline('Light2D')) // rock
        }
        if (this.biome == 3 || this.biome == 4 || this.biome == 5) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(6, 9)).setPipeline('Light2D')) // rock
        }
        if (this.biome == 6 || this.biome == 7 || this.biome == 8) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(14, 17)).setPipeline('Light2D')) // rock
        }
        if (this.biome == 9 || this.biome == 10) {
            this.ground.add(this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(22, 25))).setPipeline('Light2D')) // rock
        }
        if (this.ore_red && (Phaser.Math.Between(0, this.ore_Rarity) == 0)) { this.ore.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(34).setDepth(1).setPipeline('Light2D')) }
        else if (this.ore_blue && (Phaser.Math.Between(0, this.ore_Rarity) == 0)) { this.ore.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(35).setDepth(1).setPipeline('Light2D')) }
        else if (this.ore_green && (Phaser.Math.Between(0, this.ore_Rarity) == 0)) { this.ore.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(36).setDepth(1).setPipeline('Light2D')) }
    }

    onTop(x, y) {
        //sand && crystal
        if (this.biome == 1) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(4, 5)))
            if (Phaser.Math.Between(0, this.ore_Rarity) == 0) {/*add blue crystal */ }
        }
        if (this.biome == 3) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(10, 11)))
            if (Phaser.Math.Between(0, this.ore_Rarity) == 0) {/*add blue crystal */ }
        }
        if (this.biome == 6 || this.biome == 7) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(18, 19)))
            if (Phaser.Math.Between(0, this.ore_Rarity) == 0) {/*add blue crystal */ }
        }
        if (this.biome == 9) {
            this.ground.add(this.physics.add.sprite(x, y - 16, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(26, 27)))
            if (Phaser.Math.Between(0, this.ore_Rarity) == 0) {/*add blue crystal */ }
        }
        //crystal
        if (Phaser.Math.Between(0, this.ore_Rarity) == 0) {/*add blue crystal */ }

    }

    under(x, y) {


        //sand
        if (this.biome == 3) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(12, 13)))
        }
        if (this.biome == 6 || this.biome == 7) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(20, 21)))
        }
        if (this.biome == 9 || this.biome == 10) {
            this.ground.add(this.physics.add.sprite(x, y, "Tiles").setSize(16, 16).setFrame(Phaser.Math.Between(28, 29)))
        }

    }

    moveDrill(lr, player, up, down, go, drill) {
        if (go.isDown) { // if mining
            if (up.isDown) {
                //anim drill haut
                drill.body.x = player.body.x
                drill.body.y = player.body.y
            }
            else if (down.isDown) {
                //anim drill bas
                drill.body.x = player.body.x
                drill.body.y = player.body.y
            }
            else {
                if (lr) {
                    //anim drill droit
                    drill.body.x = player.body.x
                    drill.body.y = player.body.y
                }
                else {
                    //anim drill guauche
                    drill.body.x = player.body.x
                    drill.body.y = player.body.y
                }
            }

        }
        else {// if not mining
            if (lr) { // idle right
                drill.body.x = player.body.x
                drill.body.y = player.body.y

            }
            else { // idle left
                drill.body.x = player.body.x
                drill.body.y = player.body.y

            }
        }
    }

    placeGadget(wich, player, gloom) {
        target_x = Phaser.Math.Snap.To(player.body.x + 8, 16);
        target_y = Phaser.Math.Snap.To(player.body.y + 8, 16);

        if (wich == 1) { // scafolding
            if (this.scafoldingLevel == 0 && gloom >= 10 && !this.physics.overlap(this.players, this.chain && player.body.blocked.down)) { //scafoldin lv 1
                this.chain.add(this.physics.add.sprite(target_x, target_y, 'scafoldinA').setSize(16, 32)) // lader
                this.plateforme.add(this.physics.add.sprite(target_x, target_y - 16,).setSize(14, 3))     // step 1
                gloom -= 10
            }
            if (this.scafoldingLevel == 1 && gloom >= 15 && !this.physics.overlap(this.players, this.chain) && player.body.blocked.down) { //scafoldin lv 2
                this.chain.add(this.physics.add.sprite(target_x, target_y, 'scafoldinB').setSize(16, 48))     // ladder
                this.plateforme.add(this.physics.add.sprite(target_x, target_y - 16,).setSize(14, 3))         // step 1
                this.plateforme.add(this.physics.add.sprite(target_x, target_y,).setSize(14, 3))              // step 2
                this.plateforme.add(this.physics.add.sprite(target_x, target_y + 16,).setSize(14, 3))         // step 3
                gloom -= 15
            }
            if (this.scafoldingLevel == 0 && gloom >= 25 && !this.physics.overlap(this.players, this.chain) && player.body.blocked.down) { //scafoldin lv 3
                this.chain.add(this.physics.add.sprite(target_x, target_y, 'scafoldinC').setSize(16, 64))   //lader
                this.plateforme.add(this.physics.add.sprite(target_x, target_y - 48,).setSize(14, 3))       //step 1
                gloom -= 25
            }
            if (this.scafoldingLevel == 0 && gloom >= 50 && !this.physics.overlap(this.players, this.chain) && player.body.blocked.down) { //scafoldin lv 4
                this.scafMAX.add(this.physics.add.sprite(target_x, target_y - 16, 'scafoldinD').setSize(32, 32)) // elevator
                gloom -= 50
            }
        }
        else if (wich == 2) { // lamp
            if (this.lampLevel == 0 && gloom >= 5 && !this.physics.overlap(this.players, this.object) && player.body.blocked.down) { // lamp lv 1
                this.object.add(this.physics.add.sprite(target_x, target_y, 'lampA').setSize(16, 64)) //game object 
                //light
                gloom -= 5
            }
            if (this.lampLevel == 0 && gloom >= 15 && !this.physics.overlap(this.players, this.object) && player.body.blocked.down) { // lamp lv 2
                this.object.add(this.physics.add.sprite(target_x, target_y, 'lampB').setSize(16, 64)) //game object 
                //light
                gloom -= 15
            }
            if (this.lampLevel == 0 && gloom >= 25 && !this.physics.overlap(this.players, this.object)) { // lamp lv 3
                this.object.add(this.physics.add.sprite(target_x, target_y, 'lampC').setSize(16, 64)) //game object 
                //light
                gloom -= 25
            }
            if (this.lampLevel == 0 && gloom >= 75 && !this.physics.overlap(this.players, this.object) && player.body.blocked.down) { // lamp lv 4
                this.object.add(this.physics.add.sprite(target_x, target_y, 'lampD').setSize(16, 64)) //game object 
                //light
                gloom -= 75
            }
        }
        return (gloom)
    }


    drilling(drill, tile) {
        this.time.addEvent({
            delay: 500, callback: () => {
                if (this.physics.overlap(drill, tile))
                    tile.destroy()
            },
        })
    }

    pickUp(player, ore) {

    }
}