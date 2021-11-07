import React, { useState, useReducer } from 'react';

let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).user
	: '';
let token = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).auth_token
	: '';

  export const initialState = {
    token: null,
    eicn: null,
    cn: null,
    cell:null,
    sweetCookie: null,
    pl: null,
    edAttMng: null,
    edAttMngApp: null,
    edAttApp: null,
    edAtt: null,
    edAbs: null,
    super: null,
    dep: null,
    isMng: null,
    cname: '',
    uname: '',
    needToSign:false,
    attType:"0",
    needToFillForm:"0",
    exportReports: false,
    viewAttendance: false,
    projectsModule: false,
    tryLogin: false
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				token: action.payload.token,
        eicn: action.payload.empICN,
        cn: action.payload.cn,
        cell:action.payload.cell,
        sweetCookie: action.payload.sweetCookie,
        pl: action.payload.permissionLvl,
        edAttMng: action.payload.canEditAttendanceMng,
        edAttMngApp: action.payload.needMasterMngApprove,
        edAttApp: action.payload.needEditAttendanceApprove,
        canReport: action.payload.canReport,
        edAtt: action.payload.canEditAttendance,
        edAbs: action.payload.canEditAbsence,
        needToSign:action.payload.needToSign,
        attType:action.payload.attType,
        needToFillForm:action.payload.needToFillForm,
        super: action.payload.cn === '001' && action.payload.eicn === '001',
        dep: action.payload.depCode,
        isMng: action.payload.isMng,
        cname: action.payload.cname,
        uname: decodeURIComponent(action.payload.uname).replace(/\+/g, " "),
        exportReports: action.payload.exportReports,
        viewAttendance: action.payload.viewAttendance,
        projectsModule: action.payload.projectsModule,
        tryLogin:true
			};
		case 'LOGOUT':
			return {...initialState,tryLogin:true};
		case 'LOGIN_ERROR':
			return {
				...initialState,
				tryLogin: false
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};