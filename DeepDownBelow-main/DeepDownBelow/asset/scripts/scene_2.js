class Drill extends Phaser.Scene {

    constructor() {
        super("drill");
    }

    init(data) {
        this.playerAMOUNT = data.playerAMOUNT
        this.player1READY = data.player1READY
        this.player2READY = data.player2READY
        this.player3READY = data.player3READY
        this.player4READY = data.player4READY

        // minerais possédé par les joueurs
        // pv restant
        // toute les upgrade faites
        //état précédent de la drill

    }

    preload() {

        // ====== SPRITE ======

        this.load.spritesheet("persoA", "/asset/sprites/characterA.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoB", "/asset/sprites/characterB.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoC", "/asset/sprites/characterC.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("persoD", "/asset/sprites/characterD.png", { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet("porteA", "/asset/sprites/mapSprite/spawnDoor.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteB", "/asset/sprites/mapSprite/spawnDoorB.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteC", "/asset/sprites/mapSprite/spawnDoorC.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("porteD", "/asset/sprites/mapSprite/spawnDoorD.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("doorOut", "/asset/sprites/mapSprite/doorOut.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("porteDrillA", "/asset/sprites/mapSprite/drillDoorA.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("porteDrillB", "/asset/sprites/mapSprite/drillDoorB.png", { frameWidth: 32, frameHeight: 48 });

        this.load.spritesheet("ready", "/asset/sprites/startingTXT.png", { frameWidth: 256, frameHeight: 96 });
        this.load.spritesheet("Upgrade_Drill", "/asset/sprites/ui_Upgrade_Drill.png", { frameWidth: 80, frameHeight: 48 });

        this.load.spritesheet("Hey", "/asset/sprites/UI/interactible.png", { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("fuelA", "/asset/sprites/UI/drillUsage.png", { frameWidth: 48, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.image("object_Tileset", "/asset/sprites/tileSet/decorTileset.png");
        this.load.image("tileset_lobby", "/asset/sprites/tileSet/tileSet.png");

        // - - - add maps - - - 
        this.load.tilemapTiledJSON("drill", "/asset/maps/drill.json");



        // - - - Groups - - - 
        this.players = this.physics.add.group({
            allowGravity: false,
        });

        this.plateforme = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.chain = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

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
        // center the game screen
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        //- - - loading map - - -
        const carteDuNiveau = this.add.tilemap("drill");

        // - - - loading tilset - - - 
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset",
            "tileset_lobby"
        );
        const objet = carteDuNiveau.addTilesetImage(
            "decorTileset",
            "object_Tileset"
        );

        // - - - loading layers - - -
        this.Layer_0 = carteDuNiveau.createLayer("Layer_0", objet);
        this.Layer_1 = carteDuNiveau.createLayer("Layer_1", tileset).setDepth(1);
        this.Layer_2 = carteDuNiveau.createLayer("Layer_2", tileset).setDepth(1.1);
        this.Layer_3 = carteDuNiveau.createLayer("Layer_3", tileset).setDepth(1.2);

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



        this.anims.create({
            key: 'PersoA_climb',
            frames: this.anims.generateFrameNumbers('persoA', { start: 9, end: 12 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'PersoB_climb',
            frames: this.anims.generateFrameNumbers('persoB', { start: 9, end: 12 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'PersoC_climb',
            frames: this.anims.generateFrameNumbers('persoC', { start: 9, end: 12 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'PersoD_climb',
            frames: this.anims.generateFrameNumbers('persoD', { start: 9, end: 12 }),
            frameRate: 15,
            repeat: 0
        });
        //door :
        this.anims.create({
            key: 'door_A_idle',
            frames: this.anims.generateFrameNumbers('porteA', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'door_B_idle',
            frames: this.anims.generateFrameNumbers('porteB', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'door_C_idle',
            frames: this.anims.generateFrameNumbers('porteC', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'door_D_idle',
            frames: this.anims.generateFrameNumbers('porteD', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'door_A_open',
            frames: this.anims.generateFrameNumbers('porteA', { start: 5, end: 31 }),
            frameRate: 20,
            repeat: 0

        });
        this.anims.create({
            key: 'door_B_open',
            frames: this.anims.generateFrameNumbers('porteB', { start: 5, end: 31 }),
            frameRate: 20,
            repeat: 0

        });
        this.anims.create({
            key: 'door_C_open',
            frames: this.anims.generateFrameNumbers('porteC', { start: 5, end: 31 }),
            frameRate: 20,
            repeat: 0

        });
        this.anims.create({
            key: 'door_D_open',
            frames: this.anims.generateFrameNumbers('porteD', { start: 5, end: 31 }),
            frameRate: 20,
            repeat: 0

        });
        this.anims.create({
            key: 'drillDoorA_open',
            frames: this.anims.generateFrameNumbers('porteDrillA', { start: 19, end: 0 }),
            frameRate: 15,
            repeat: 0

        });
        // ui
        this.anims.create({
            key: 'HeyListen',
            frames: this.anims.generateFrameNumbers('Hey', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 0

        });


        // ===== objects =====
        // > camera 
        this.camCNTR = this.physics.add.sprite(400, 600)

        // ===== CAMERA =====
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.camCNTR);
        this.cameras.main.setLerp(0.04, 0.04);

        // > chains
        this.chainA = this.physics.add.sprite(296, 232).setSize(16, 180); this.chain.add(this.chainA)
        this.chainB = this.physics.add.sprite(408, 272).setSize(16, 256); this.chain.add(this.chainB)
        this.chainC = this.physics.add.sprite(536, 232).setSize(16, 180); this.chain.add(this.chainC)
        this.chainD = this.physics.add.sprite(328, 432).setSize(16, 200); this.chain.add(this.chainD)
        this.chainE = this.physics.add.sprite(488, 432).setSize(16, 200); this.chain.add(this.chainE)

        // > plateform
        this.plateformeA = this.physics.add.sprite(408, 216).setSize(300, 16); this.plateforme.add(this.plateformeA)
        this.plateformeB = this.physics.add.sprite(408, 312).setSize(100, 16); this.plateforme.add(this.plateformeB)
        this.plateformeC = this.physics.add.sprite(408, 408).setSize(308, 16); this.plateforme.add(this.plateformeC)
        this.plateformeD = this.physics.add.sprite(408, 536).setSize(100, 16); this.plateforme.add(this.plateformeD)

        // > door
        this.doorOut = this.physics.add.sprite(224, 504, "doorOut").setDepth(1)

        // > ui 
        this.HeyListen_1 = this.physics.add.sprite(264, 384, "Hey").setDepth(10).setAlpha(0)
        this.drill_state = this.physics.add.sprite(408, 460, "fuelA").setDepth(10).setAlpha(0)

        this.UI_1 = this.physics.add.sprite(264, 334, "Upgrade_Drill").setDepth(10).setAlpha(0)

        // > crafting table 
        this.Upgrade_Drill = this.physics.add.sprite(264, 384).setSize(46, 32);
        this.Drill_bore = this.physics.add.sprite(408, 504).setSize(100, 150);

        // ===== players ======
        if (this.player1READY) {
            this.player1 = this.physics.add.sprite(280, 500, 'persoA');
            this.player1.body.setSize(20, 20);
            this.players.add(this.player1)
            this.chain_COL1 = this.physics.add.overlap(this.player1, this.chain, this.chainRide, null, this);
            this.plateformeCOL1 = this.physics.add.collider(this.player1, this.plateforme);
            this.persoA_state = 1
        }
        if (this.player2READY) {
            this.player2 = this.physics.add.sprite(280, 500, 'persoB');
            this.player2.body.setSize(20, 20);
            this.players.add(this.player2)
            this.chain_COL2 = this.physics.add.overlap(this.player2, this.chain, this.chainRide, null, this);
            this.plateformeCOL2 = this.physics.add.collider(this.player2, this.plateforme);
            this.persoB_state = 1
        }
        if (this.player3READY) {
            this.player3 = this.physics.add.sprite(280, 500, 'persoC');
            this.player3.body.setSize(20, 20);
            this.players.add(this.player3)
            this.chain_COL3 = this.physics.add.overlap(this.player3, this.chain, this.chainRide, null, this);
            this.plateformeCOL3 = this.physics.add.collider(this.player3, this.plateforme);
            this.persoC_state = 1
        }
        if (this.player4READY) {
            this.player4 = this.physics.add.sprite(280, 500, 'persoD');
            this.player4.body.setSize(20, 20);
            this.players.add(this.player4)
            this.chain_COL4 = this.physics.add.overlap(this.player4, this.chain, this.chainRide, null, this);
            this.plateformeCOL4 = this.physics.add.collider(this.player4, this.plateforme);
            this.persoD_state = 1
        }

        // ===== COllIDER =====

        this.physics.add.collider(this.players, this.Layer_3);
        this.physics.add.collider(this.players, this.Layer_2);
        this.Layer_3.setCollisionByProperty({ estSolide: true });
        this.Layer_2.setCollisionByProperty({ estSolide: true });

        this.craftA = this.physics.add.overlap(this.players, this.Upgrade_Drill, this.upgradeA, null, this)
        this.fuelA = this.physics.add.overlap(this.players, this.Drill_bore, this.refuel1, null, this)
        this.OUT = this.physics.add.overlap(this.players, this.doorOut, this.Out3, null, this)
    }

    update() {
        this.HeyListen_1.anims.play('HeyListen', true);
        //====== DEBUG ======
        if (this.__state || this.__debug) {
            console.log("states : \n J1 :", this.persoA_state, "\n J2 :", this.persoB_state, "\n J3 :", this.persoC_state, "\n J4 :", this.persoD_state)
        }

        // ===== EXIT OVERLAP ===== 


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


        if (this.player1READY) {
            if (this.persoA_state == 0) {       // dead state

            }
            else if (this.persoA_state == 1) {  // "normal" state
                this.move(this.keyZ, this.keyS, this.keyQ, this.keyD, this.player1, 150)

                //vertical
                if (this.keyZ.isDown && this.player1.body.blocked.down) {
                    this.gravityA = -300
                }
                else if (this.player1.body.blocked.down) { this.gravityA = 30 }
                else {
                    this.player1.setVelocityY(this.gravityA)
                    if (this.gravityA < 500) { this.gravityA += 20 }
                }
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
        }


        // ====== PLAYER 2 ======


        if (this.player2READY) {
            if (this.persoB_state == 0) {       // dead state

            }
            else if (this.persoB_state == 1) {  // "normal" state
                this.move(this.keyO, this.keyL, this.keyK, this.keyM, this.player2, 150)

                //vertical
                if (this.keyO.isDown && this.player2.body.blocked.down) {
                    this.gravityB = -300
                }
                else if (this.player2.body.blocked.down) { this.gravityB = 30 }
                else {
                    this.player2.setVelocityY(this.gravityB)
                    if (this.gravityB < 500) { this.gravityB += 20 }
                }
            }

            else if (this.persoB_state == 2) {  // ladder state

                this.ladder_state(this.keyO, this.keyL, this.player2, 150)
                this.physics.world.remove(this.chain_COL2)

                this.physics.world.removeCollider(this.plateformeCOL2);
                this.chain_COL2 = 0
                this.gravityB = - 50

                if (this.keyO.isDown || this.keyL.isDown) {
                    this.player2.anims.play('PersoB_climb', true);
                }

                if (this.keyK.isDown || this.keyM.isDown) {

                    this.persoB_state = 1;
                    this.gravityB = -200
                    this.time.addEvent({
                        delay: 250, callback: () => {
                            this.chain_COL2 = this.physics.add.overlap(this.player2, this.chain, this.chainRide, null, this);
                            this.plateformeCOL2 = this.physics.add.collider(this.player2, this.plateforme);
                        },
                    })
                }
            }
            else if (this.persoB_state == 3) {  // mini game state

            }
        }

        // ====== PLAYER 3 ======


        if (this.player3READY) {
            if (this.persoC_state == 0) {       // dead state

            }
            else if (this.persoC_state == 1) {  // "normal" state
                this.move(this.key8, this.key5, this.key4, this.key6, this.player3, 150)

                //vertical
                if (this.key8.isDown && this.player3.body.blocked.down) {
                    this.gravityC = -300
                }
                else if (this.player3.body.blocked.down) { this.gravityC = 30 }
                else {
                    this.player3.setVelocityY(this.gravityC)
                    if (this.gravityC < 500) { this.gravityC += 20 }
                }
            }

            else if (this.persoC_state == 2) {  // ladder state

                this.ladder_state(this.key8, this.key5, this.player3, 150)
                this.physics.world.remove(this.chain_COL3)

                this.physics.world.removeCollider(this.plateformeCOL3);
                this.chain_COL3 = 0
                this.gravityC = - 50

                if (this.key8.isDown || this.key5.isDown) {
                    this.player3.anims.play('PersoC_climb', true);
                }

                if (this.key4.isDown || this.key6.isDown) {

                    this.persoC_state = 1;
                    this.gravityC = -200
                    this.time.addEvent({
                        delay: 250, callback: () => {
                            this.chain_COL3 = this.physics.add.overlap(this.player3, this.chain, this.chainRide, null, this);
                            this.plateformeCOL3 = this.physics.add.collider(this.player3, this.plateforme);
                        },
                    })
                }
            }
            else if (this.persoC_state == 3) {  // mini game state

            }
        }


        // ====== PLAYER 4 ======

        if (this.player4READY) {
            if (this.persoD_state == 0) {       // dead state

            }
            else if (this.persoD_state == 1) {  // "normal" state
                this.move(this.keyUP, this.keyDOWN, this.keyLEFT, this.keyRIGHT, this.player4, 150)

                //vertical
                if (this.keyUP.isDown && this.player4.body.blocked.down) {
                    this.gravityD = -300
                }
                else if (this.player4.body.blocked.down) { this.gravityD = 30 }
                else {
                    this.player4.setVelocityY(this.gravityD)
                    if (this.gravityD < 500) { this.gravityD += 20 }
                }
            }

            else if (this.persoD_state == 2) {  // ladder state

                this.ladder_state(this.keyUP, this.keyDOWN, this.player4, 150)
                this.physics.world.remove(this.chain_COL4)

                this.physics.world.removeCollider(this.plateformeCOL4);
                this.chain_COL4 = 0
                this.gravityD = - 50

                if (this.keyUP.isDown || this.keyDOWN.isDown) {
                    this.player4.anims.play('PersoD_climb', true);
                }

                if (this.keyLEFT.isDown || this.keyRIGHT.isDown) {

                    this.persoD_state = 1;
                    this.gravityD = -200
                    this.time.addEvent({
                        delay: 250, callback: () => {
                            this.chain_COL4 = this.physics.add.overlap(this.player4, this.chain, this.chainRide, null, this);
                            this.plateformeCOL4 = this.physics.add.collider(this.player4, this.plateforme);
                        },
                    })
                }
            }
            else if (this.persoD_state == 3) {  // mini game state

            }
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

        /*if (this.physics.overlap(this.players, this.ui)) {

            if (!this.ready2) { this.ready1 = true }
            if (this.ready3) { this.ready1 = false }


            if (this.ready1 == true) {
                console.log("3", this.ready1)
                //this.txtA.setFrame(0)
                //this.txtB.setFrame(0)
                //this.txtA.setVisible(true)
                //this.txtB.setVisible(true)

                this.time.addEvent({
                    delay: 2000, callback: () => {
                        this.ready2 = true
                        this.ready1 = false
                    },
                })
            }
        }

        if (this.physics.overlap(this.players, this.ui) && this.ready2 == true) {
            this.ready1 = false
            //this.txtA.setFrame(1)
            //this.txtB.setFrame(1)
            //console.log('2', this.ready2)

            this.time.addEvent({
                delay: 2000, callback: () => {
                    this.ready3 = true
                },
            })

        }
        else if (this.ready1) {
            this.ready1 = false
            this.ready2 = false
        }

        if (this.physics.overlap(this.players, this.ui) && this.ready3 == true) {
            this.ready1 = false
            this.ready2 = false

           //this.txtA.setFrame(2)
           //this.txtB.setFrame(2)
            //console.log('1')
            this.time.addEvent({
                delay: 2000, callback: () => {
                    //console.log('0')
                    this.ready3 = false
                },
            })

        }
        else {
            this.ready1 = false
            this.ready2 = false
            this.ready3 = false
        }*/

        // ===== UI =====
        if (this.warnerA && !this.physics.overlap(this.players, this.Upgrade_Drill)) {
            this.warnerA = false
            this.tweens.add({
                targets: this.HeyListen_1,
                alpha: 0,
                duration: 100,
                ease: 'Linear',
                repeat: 0
            });
        }
        if (this.used2 && !this.physics.overlap(this.players, this.Drill_bore)) {
            this.used2 = false
            this.tweens.add({
                targets: this.drill_state,
                alpha: 0,
                duration: 100,
                ease: 'Linear',
                repeat: 0
            });
        }

        if (!this.physics.overlap(this.players, this.doorOut)) {
            this.door_0 = false; this.door_1 = false; this.door_2 = false;
            this.doorOut.setFrame(0)

        }

    }

    // =============================================
    //                FONCTIONS
    // =============================================

    move(up, down, left, right, target, speed) {
        //horizontal
        if (right.isDown) { // walk right
            if (target.body.velocity.x < speed) { target.body.velocity.x += 10.1 }

            if (target == this.player1) { target.anims.play('PersoA_walk_right', true); this.LRa = false }
            if (target == this.player2) { target.anims.play('PersoB_walk_right', true); this.LRb = false }
            if (target == this.player3) { target.anims.play('PersoC_walk_right', true); this.LRc = false }
            if (target == this.player4) { target.anims.play('PersoD_walk_right', true); this.LRc = false }

        }
        else if (left.isDown) { // walk left
            if (target.body.velocity.x > -speed) { target.body.velocity.x -= 10.1 }

            if (target == this.player1) { target.anims.play('PersoA_walk_left', true); this.LRa = true }
            if (target == this.player2) { target.anims.play('PersoB_walk_left', true); this.LRb = true }
            if (target == this.player3) { target.anims.play('PersoC_walk_left', true); this.LRc = true }
            if (target == this.player4) { target.anims.play('PersoD_walk_left', true); this.LRc = true }
        }
        else { // stop the player when idle
            if (target.body.velocity.x > 1) { target.body.velocity.x -= 7 }
            if (target.body.velocity.x < -1) { target.body.velocity.x += 7.3 }
            if (target.body.velocity.x > -1 && target.body.velocity.x < 1) { target.setVelocityX(0) }
        }
    }

    ladder_state(up, down, target, speed) {
        if (up.isDown) { target.setVelocityY(-speed) }
        else if (down.isDown) { target.setVelocityY(speed) }
        else { target.setVelocityY(0) }
    }


    // =============================================
    //               COLISION FONCTIONS
    // =============================================

    chainRide(player, chain) {
        if (player == this.player1 && this.persoA_state != 2 && (this.keyZ.isDown || this.keyS.isDown)) {
            this.persoA_state = 2;
            if ((player.body.x > chain.body.x - 15 || player.body.x < chain.body.x - 5)) player.body.x = chain.body.x - 5;
            player.setVelocityX(0)

            this.physics.world.removeCollider(this.chain_COL1);
        }

        if (player == this.player2 && this.persoB_state != 2 && (this.keyO.isDown || this.keyL.isDown)) {
            this.persoB_state = 2;
            if ((player.body.x > chain.body.x - 15 || player.body.x < chain.body.x - 5)) player.body.x = chain.body.x - 5;
            player.setVelocityX(0)

            this.physics.world.removeCollider(this.chain_COL2);
        }

        if (player == this.player3 && this.persoC_state != 2 && (this.key8.isDown || this.key5.isDown)) {
            this.persoC_state = 2;
            if ((player.body.x > chain.body.x - 15 || player.body.x < chain.body.x - 5)) player.body.x = chain.body.x - 5;
            player.setVelocityX(0)

            this.physics.world.removeCollider(this.chain_COL3);
        }

        if (player == this.player4 && this.persoD_state != 2 && (this.keyUP.isDown || this.keyDOWN.isDown)) {
            this.persoD_state = 2;
            if ((player.body.x > chain.body.x - 15 || player.body.x < chain.body.x - 5)) player.body.x = chain.body.x - 5;
            player.setVelocityX(0)

            this.physics.world.removeCollider(this.chain_COL4);
        }

    }

    upgradeA(player) {

        if (!this.used1) {
            this.warnerA = true

            this.tweens.add({
                targets: this.HeyListen_1,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 0
            });
        }

        if (this.keyE.isDown) {
            this.time.addEvent({
                delay: 500, callback: () => {
                    if (!this.used1) {
                        this.tweens.add({
                            targets: this.HeyListen_1,
                            alpha: 0,
                            duration: 100,
                            ease: 'Linear',
                            repeat: 0
                        });
                        this.used1 = true

                        this.tweens.add({
                            targets: this.UI_1,
                            alpha: 1,
                            duration: 300,
                            ease: 'Linear',
                            repeat: 0
                        });
                        console.log("drill")
                    }
                },
            })

        }

        if (this.used1 == true) {
            if (this.selection1 == 0) {
                if (this.drill_Speed == 0) { this.UI_1.setFrame(0) }
                if (this.drill_Speed == 1) { this.UI_1.setFrame(1) }
                if (this.drill_Speed == 2) { this.UI_1.setFrame(2) }
                if (this.drill_Speed == 3) { this.UI_1.setFrame(3) }
                if (this.drill_Speed == 4) { this.UI_1.setFrame(4) }
            }
            if (this.selection1 == 1) {
                if (this.drill_Yield == 0) { this.UI_1.setFrame(5) }
                if (this.drill_Yield == 1) { this.UI_1.setFrame(6) }
                if (this.drill_Yield == 2) { this.UI_1.setFrame(7) }
                if (this.drill_Yield == 3) { this.UI_1.setFrame(8) }
                if (this.drill_Yield == 4) { this.UI_1.setFrame(9) }
            }


            // check for user :
            if (player = this.player1) {
                this.player1.setVelocityX(0)
                this.persoA_state = 3

                //level up
                if (this.selection1 == 1 && Phaser.Input.Keyboard.JustDown(this.keyE) && this.drill_Yield < 4) {
                    this.drill_Yield += 1
                    console.log("Player 1 upgraded drill speed to level", this.drill_Yield)
                } else if (this.selection1 == 0 && Phaser.Input.Keyboard.JustDown(this.keyE) && this.drill_Speed < 4) {
                    this.drill_Speed += 1
                    console.log("Player 1 upgraded drill speed to level", this.drill_Speed)
                }


                // change selection
                if (this.selection1 == 0 && this.keyD.isDown) {
                    this.selection1 = 1
                    console.log("switch to drill yield", this.selection1)
                }
                if (this.selection1 == 1 && this.keyQ.isDown) {
                    this.selection1 = 0
                    console.log("switch to drill speed", this.selection1)
                }

                if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
                    this.persoA_state = 1
                    this.used1 = false

                    this.tweens.add({
                        targets: this.UI_1,
                        alpha: 0,
                        duration: 300,
                        ease: 'Linear',
                        repeat: 0
                    });
                }
            }
        }
    }

    refuel1() {

        this.tweens.add({
            targets: this.drill_state,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 0
        });

        this.used2 = true
    }

    Out3() {
        // check if ALL player are there
        if (!this.door_2 && !this.door_1 && !this.door_0) {
            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.doorOut.setFrame(1)
                    this.Out2()
                    this.door_2 = true
                },
            })
        }

    }

    Out2() {
        if (this.physics.overlap(this.players, this.doorOut) && !this.door_1 && !this.door_0) {
            // check if ALL player are there
            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.doorOut.setFrame(2)
                    this.Out1()
                },
            })
        }

    }

    Out1() {
        if (this.physics.overlap(this.players, this.doorOut) && !this.door_0) {
            // check if ALL player are there
            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.doorOut.setFrame(3)
                    this.Out0()
                },
            })
        }

    }

    Out0() {
        if (this.physics.overlap(this.players, this.doorOut)) {
            // check if ALL player are there
            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.doorOut.setFrame(4)
                    console.log("out")
                },
            })
        }
    }

    toCave() {
        this.scene.start("drill")
    }
}