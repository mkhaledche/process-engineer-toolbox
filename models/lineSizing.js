const calculateLineSize = calcInput => {
  const { calculationInputs, sizingCriteria, selectedCalc } = calcInput;
  const volFR =
    calculationInputs[0].unitType === 'vFR'
      ? Number(calculationInputs[0].value) / calculationInputs[0].unitFactor
      : (Number(calculationInputs[0].value) * calculationInputs[1].unitFactor) /
        (Number(calculationInputs[1].value) * calculationInputs[0].unitFactor);

  const pipeDiameter =
    (Number(calculationInputs[3].value) * 0.0254) /
    calculationInputs[3].unitFactor;
  const pipeArea = 0.78539816339 * Math.pow(pipeDiameter, 2);

  const velocity = volFR / (pipeArea * 3600);

  const density =
    Number(calculationInputs[1].value) / calculationInputs[1].unitFactor;
  const viscosity = Number(calculationInputs[2].value) / 1000;
  const reynolds = (density * pipeDiameter * velocity) / viscosity;
  const roughness = Number(calculationInputs[5].value);

  const epsilonD = (roughness * 0.0254) / pipeDiameter;

  const f1Coeff1 = 21.25 / Math.pow(reynolds, 0.9);
  const f1LogCoeff = (2 * Math.log(epsilonD + f1Coeff1)) / Math.log(10);
  const f1 = Math.pow(1.14 - f1LogCoeff, -2);

  const f1Root = Math.sqrt(f1);
  const f2Coeff1 = epsilonD / 3.7;
  const f2Coeff2 = 2.512 / f1Root / reynolds;
  const f2LogCoeff = (-2 * Math.log(f2Coeff1 + f2Coeff2)) / Math.log(10);
  const f2 = Math.pow(f2LogCoeff, -2);

  const f2Root = Math.sqrt(f2);
  const f3Coeff2 = 2.512 / f2Root / reynolds;
  const f3LogCoeff = (-2 * Math.log(f2Coeff1 + f3Coeff2)) / Math.log(10);
  const f3 = Math.pow(f2LogCoeff, -2);

  const fanning = reynolds < 2000 ? 64 / reynolds : f3;

  const roV2 = Math.pow(velocity, 2) * density;
  const pressureDropPerLength = (roV2 * fanning) / (200 * pipeDiameter);
  const pressureDrop =
    (pressureDropPerLength * Number(calculationInputs[4].value)) /
    (calculationInputs[4].unitFactor * 1000);

  const appliedCriteria = sizingCriteria.filter(
    a => a.service === selectedCalc[0].label
  );

  const results = [
    {
      label: 'Velocity = ',
      value: velocity,
      unit: appliedCriteria[0].unit,
      unitFactor: appliedCriteria[0].unitFactor,
      criteriaMet: velocity < appliedCriteria[0].value ? "Yes" : "No"
    },
    {
      label: 'ρv2 = ',
      value: roV2,
      unit: appliedCriteria[0].unit === 'm/s' ? 'kg/ms2' : 'lb/fts2',
      unitFactor: appliedCriteria[0].unit === 'm/s' ? 1 : 0.671668,
    },
    {
      label: 'Pressure drop per length = ',
      value: pressureDropPerLength,
      unit: appliedCriteria[1].unit,
      unitFactor: appliedCriteria[1].unitFactor,
      criteriaMet: pressureDropPerLength < appliedCriteria[1].value ? "Yes" : "No"
    },
    {
      label: 'Total Pressure drop = ',
      value: pressureDrop,
      unit: appliedCriteria[1].unit === 'psi/100ft' ? 'psi' : 'bar',
      unitFactor: appliedCriteria[1].unit === 'psi/100ft' ? 14.5038 : 1,
    },
  ];


  return({ results, calculationInputs, appliedCriteria, });
};

export default calculateLineSize;
