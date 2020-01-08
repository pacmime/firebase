
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


export class AbstractDialogComponent<T> implements OnInit, OnDestroy {

    private dialogRef : MatDialogRef<T>;
    public data : any;

    constructor(
        dialogRef : MatDialogRef<T>,
        data : any
    ) {
        this.dialogRef = dialogRef;
        this.data = data;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.data = null;
        this.dialogRef = null;
    }

    close () : void {
        this.dialogRef.close();
    }


}
