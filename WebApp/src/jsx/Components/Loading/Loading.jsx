import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import "./Loading.scss";

export default function Loading({ color = "white", style }) {
    return <div className="loading-circle" style={{ border: `2pt ${color} solid`, ...style }} />
}