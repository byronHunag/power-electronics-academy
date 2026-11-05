/* Power Electronics Academy course data. Edit this file to publish course updates. */
window.POWER_ACADEMY_DATA = {
  "modules": [
    {
      "id": "pfc",
      "name": "PFC 功率因数校正",
      "subtitle": "CCM Boost · 电流塑形 · 环路 · EMI · 样机验证",
      "total": 22
    },
    {
      "id": "mag",
      "name": "高频变压器 / 磁性器件",
      "subtitle": "磁路 · 磁芯 · 气隙 · 绕组 · 损耗与测试",
      "total": 12
    },
    {
      "id": "llc",
      "name": "LLC 谐振变换器",
      "subtitle": "半桥LLC · FHA · ZVS · SR · 数字调频",
      "total": 16
    },
    {
      "id": "flyback",
      "name": "反激 Flyback",
      "subtitle": "DCM/CCM/BCM · 励磁电感 · 钳位 · 反馈",
      "total": 12
    }
  ],
  "lessons": [
    {
      "id": "pfc-01",
      "module": "pfc",
      "number": 1,
      "title": "Boost PFC 基本原理：为什么要做PFC、电流塑形",
      "status": "full",
      "summary": "单相Boost PFC让输入电流跟随整流输入电压的瞬时波形，使电网侧电流接近正弦并与电压同相；升压母线为后级LLC提供稳定直流输入。",
      "formula": [
        "PF=P/(Vrms·Irms)",
        "iL,avg(t)≈k·|vin(t)|",
        "Pin=Pout/η"
      ],
      "waveform": "整流输入电压为全波正弦包络；电感电流平均值跟随包络，高频纹波叠加其上；VBUS含100/120Hz低频纹波。",
      "selection": "以85～264Vac、400Vdc母线、600W～1kW为边界。低线满载优先校核输入RMS/峰值电流；例如1kW、η=95%、PF=0.99、85Vac时输入RMS约12.5A。",
      "debug": "输入电流过零畸变：同步观察Vin、IL、VCS、VCOMP；先排除采样偏置、最小导通时间和电流环限幅。",
      "mistakes": "把PF高等同于所有谐波合格；忽略低线满载和高线轻载两个极限工况。",
      "interfaces": "前级EMI滤波器和整流桥影响输入电流波形；PFC的400V母线、PGOOD与FAULT决定后级LLC何时启动。",
      "questions": [
        "为什么PFC输入电流要跟随输入电压而不是保持恒流？",
        "低线满载时输入RMS电流为什么最大？",
        "如何区分PF、THD和位移因数DPF？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-02",
      "module": "pfc",
      "number": 2,
      "title": "CCM、CrM/BCM、DCM 三种工作模式",
      "status": "full",
      "summary": "CCM电感电流不降到零；BCM/CrM每周期谷值恰好到零；DCM则存在零电流区。模式决定峰值电流、开关频率和控制方法。",
      "formula": [
        "ΔIL≈|vin|·D/(L·fs)",
        "Ivalley=Iavg−ΔIL/2",
        "CCM条件：Ivalley>0"
      ],
      "waveform": "CCM为连续三角波；BCM谷值触零；DCM电流先降至零并保持一段时间。应在整流半周多个相位点观察，不能只看峰值附近。",
      "selection": "对固定频率CCM设计，按最低线满载及最大纹波比校核电感；CrM需评估频率随线电压/负载变化的范围。",
      "debug": "若预期CCM却出现谷值触零，先核对负载、L值、fs、采样比例和电流探头方向。",
      "mistakes": "只依据控制芯片名称判断模式；把轻载跳脉冲误判为功率级DCM。",
      "interfaces": "工作模式影响MOS/二极管损耗、EMI频谱及电流环补偿，也影响PFC到LLC的动态响应。",
      "questions": [
        "如何从电感电流波形判断CCM/BCM/DCM？",
        "电感减小会怎样改变纹波与峰值电流？",
        "为什么CrM开关频率不是固定值？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-03",
      "module": "pfc",
      "number": 3,
      "title": "CCM Boost PFC电感、纹波、峰值电流初步计算",
      "status": "full",
      "summary": "Boost PFC电感承担输入电流整形与储能。其电感量决定电流纹波，磁芯和气隙决定饱和裕量，铜线与磁芯损耗决定温升。",
      "formula": [
        "D(t)≈1−|vin(t)|/Vbus",
        "ΔIL≈|vin|·D/(L·fs)",
        "IL,pk≈IL,avg+ΔIL/2"
      ],
      "waveform": "MOS导通期间IL按vin/L上升，关断期间按(vin−Vbus)/L下降；检查整流半周不同相位下的纹波与峰值。",
      "selection": "先由Pin估算输入电流，再设纹波比并扫过整流半周；选磁芯后核对Ipeak、Isat、温升、气隙边缘磁通和绕组窗口。",
      "debug": "电感电流斜率突然变陡或峰值随温度上升，优先排查磁芯饱和、气隙偏差和探头量程。",
      "mistakes": "只按额定电流选电感；忽略峰值电流、温度降额及气隙边缘磁场造成的绕组热点。",
      "interfaces": "PFC电感参数与输入电流环直接相关；电感饱和会触发OCP并导致400V母线跌落、LLC掉电。",
      "questions": [
        "电感纹波由哪些参数决定？",
        "为什么要计算峰值而不仅是平均电流？",
        "电感饱和在电流波形上有哪些典型特征？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-04",
      "module": "pfc",
      "number": 4,
      "title": "PFC MOSFET、Boost二极管选型：RDS(on)、Qg、Qrr、SiC",
      "status": "full",
      "summary": "Boost MOSFET和升压二极管承受高频换流应力。MOS选择需平衡耐压、RDS(on)、Qg、Coss和开关损耗；二极管需关注反向恢复及结电容。",
      "formula": [
        "Pcond≈Irms²·RDS(on)",
        "Pgate≈Qg·Vdrive·fs",
        "Psw≈(Eon+Eoff)·fs"
      ],
      "waveform": "同步看VGS、VDS、IL和二极管电流；MOS开通瞬间的电流尖峰与VDS振铃可揭示Qrr、寄生电感和驱动问题。",
      "selection": "VDS耐压要覆盖400V母线、浪涌与尖峰；按热态RDS(on)、实际栅极驱动、散热条件核算损耗。二极管反压需留有设计裕量。",
      "debug": "MOS过热先区分导通损耗、开关损耗和驱动损耗；用差分探头测VDS，短接地弹簧测VGS。",
      "mistakes": "只比较标称RDS(on)；忽略Qg导致驱动损耗、Qrr导致开通损耗，以及高温参数变化。",
      "interfaces": "器件损耗决定PFC散热和效率，也会改变母线纹波与后级LLC可用功率。",
      "questions": [
        "Qg变大会增加哪类损耗？",
        "二极管Qrr为什么会增加MOS开通应力？",
        "VDS尖峰过高时应优先检查哪些布局寄生参数？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-05",
      "module": "pfc",
      "number": 5,
      "title": "400V Bulk电容、100/120Hz纹波、Hold-up Time",
      "status": "full",
      "summary": "400V Bulk电容吸收单相系统两倍工频功率脉动，并在短时掉电时提供能量。容量、纹波电流、ESR、寿命和浪涌必须联合设计。",
      "formula": [
        "C≥2·Pout·thold/[η·(V1²−V2²)]",
        "ΔVbus≈Pout/(2πfline·C·Vbus)",
        "Pcap≈Iripple²·ESR"
      ],
      "waveform": "VBUS通常叠加100Hz（50Hz电网）或120Hz（60Hz电网）纹波；掉电后母线按储能放电曲线下降。",
      "selection": "明确维持时间、允许母线最低值、环境温度和寿命目标；核对电解电容纹波电流额定值及并联均流。",
      "debug": "纹波偏大时同步测VBUS、负载功率和电容温度，区分容量不足、ESR偏大和PFC环路调制。",
      "mistakes": "只按μF选型；忽略纹波电流、寿命曲线、母线过压和预充电流。",
      "interfaces": "Bulk电容把PFC与LLC动态隔离；LLC启动/负载阶跃会通过母线能量变化反馈到PFC。",
      "questions": [
        "Bulk电容容量与保持时间有什么关系？",
        "为什么单相PFC母线存在两倍工频纹波？",
        "如何验证电容纹波电流和寿命？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-06",
      "module": "pfc",
      "number": 6,
      "title": "平均电流模式控制：慢电压环与快电流环",
      "status": "full",
      "summary": "平均电流模式PFC包含快速电流内环和慢速母线电压外环。内环塑形输入电流，外环只调节平均功率需求，避免追踪两倍工频纹波。",
      "formula": [
        "Gci(s)=Kp+Ki/s（简化PI）",
        "fBW,voltage≪2fline",
        "i*ref(t)=Gv·|vin(t)|"
      ],
      "waveform": "电流参考包络应平滑；VBUS有100/120Hz纹波而电压环输出不应明显跟随该纹波摆动。",
      "selection": "电压环带宽通常显著低于两倍工频；电流环带宽需结合fs、采样延迟、PWM和功率级增益设计。",
      "debug": "输入电流出现低频包络畸变，检查电压环带宽、乘法器/电流参考限幅及电流环补偿。",
      "mistakes": "电压环过快导致电流参考随母线纹波调制；电流环带宽过高造成噪声放大和相位裕度不足。",
      "interfaces": "电流环控制输入功率，电压环维持400V母线；与LLC恒功率负载的动态交互要考虑。",
      "questions": [
        "为什么电压环带宽不能太高？",
        "电流内环和电压外环分别控制什么？",
        "电压环追踪100Hz纹波会怎样影响THD？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-07",
      "module": "pfc",
      "number": 7,
      "title": "PF、DPF、THD及功率分析仪测试方法",
      "status": "full",
      "summary": "PF=P/S；DPF反映基波电压电流相位差；THD反映谐波含量。PFC测试必须同时观察波形、谐波谱和真实功率。",
      "formula": [
        "PF=P/(Vrms·Irms)",
        "THD_I=√(ΣIh²)/I1",
        "PF≈DPF/√(1+THD_I²)（近似）"
      ],
      "waveform": "检查电流过零缺口、峰顶平坦、半周不对称和高频噪声；谐波谱用于识别低次谐波与开关频段噪声。",
      "selection": "功率分析仪设置正确的带宽、接线方式和采样窗口；覆盖低线/高线、轻载/满载及热稳态。",
      "debug": "PF不达标时分别查看DPF和THD；THD高时观察过零畸变、限流削顶和采样噪声。",
      "mistakes": "把示波器上看似正弦当作合格；功率分析仪电流量程、带宽或接线错误会造成误判。",
      "interfaces": "PFC性能影响整机输入功率、效率和认证；后级LLC负载状态会改变PFC的输入电流。",
      "questions": [
        "PF与DPF有什么区别？",
        "THD高但DPF接近1说明什么？",
        "测试PFC至少需要记录哪些输入条件？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-08",
      "module": "pfc",
      "number": 8,
      "title": "OCP、OVP、Brown-in/Brown-out、Soft-start",
      "status": "full",
      "summary": "保护设计要覆盖逐周期峰值限流、母线OVP、输入欠压/掉电、软启动、过温和故障锁存/重试。硬件快速保护与软件状态管理分工明确。",
      "formula": [
        "VOVP=Vref·(Rtop+Rbot)/Rbot",
        "Itrip≈VCS,th/Rsense",
        "Pin≈Vbus·Ibus"
      ],
      "waveform": "触发保护时同步捕获VBUS、VCS/IL、VGS、VCC、FAULT和EN；区分一次限流、打嗝重启与锁存关断。",
      "selection": "按器件SOA、磁性件饱和和电容耐压设置保护阈值；阈值需含分压误差、采样误差、温漂和消隐时间。",
      "debug": "误触发先查CS尖峰、地弹、RC滤波和比较器消隐；真实OCP则确认负载、磁饱和及开关短路。",
      "mistakes": "把软件ADC采样当作唯一短路保护；保护阈值没有考虑最坏公差和传播延迟。",
      "interfaces": "PFC的PGOOD/FAULT应与LLC Enable互锁；异常时优先安全关闭后级功率级。",
      "questions": [
        "逐周期OCP与平均电流限制有什么区别？",
        "母线OVP分压误差如何纳入阈值？",
        "为什么高压功率级需要硬件快速保护？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-09",
      "module": "pfc",
      "number": 9,
      "title": "PFC EMI基础：共模CM、差模DM、X/Y电容、CMC",
      "status": "full",
      "summary": "EMI分为差模和共模。差模电流在L/N之间闭合，共模电流经寄生电容、机壳和Y电容回流；布局与滤波器必须联合处理。",
      "formula": [
        "f0≈1/(2π√LC)",
        "Vnoise≈Lstray·di/dt",
        "Inoise≈Cpar·dv/dt"
      ],
      "waveform": "开关节点高dv/dt产生共模噪声；输入电流纹波和整流换流产生差模噪声。用LISN观察传导频谱。",
      "selection": "先判定超标频段和噪声模式，再配置X电容、差模电感、共模电感及阻尼；Y电容受漏电流和安规约束。",
      "debug": "高频峰值集中在开关频率及倍频时，先检查热回路、开关节点面积和共模回流路径。",
      "mistakes": "只靠增加电容解决所有频段；忽略Y电容漏电流、CMC饱和和滤波器谐振。",
      "interfaces": "EMI滤波器位于整流/PFC之前，可能与PFC输入阻抗形成谐振，影响启动和低频稳定性。",
      "questions": [
        "共模与差模噪声的回流路径有何不同？",
        "为什么Y电容不能随意增大？",
        "如何从频谱判断优先整改哪个噪声源？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-10",
      "module": "pfc",
      "number": 10,
      "title": "1kW PFC EMI Filter第一版设计与参数选择",
      "status": "full",
      "summary": "EMI滤波器的差模/共模衰减由电感、电容和阻尼共同决定。滤波器不是越大越好，必须考虑源/负载阻抗及PFC控制环稳定性。",
      "formula": [
        "fc≈1/(2π√LC)",
        "Attenuation≈20log10(Vbefore/Vafter)",
        "P≈I²R（阻尼损耗估算）"
      ],
      "waveform": "对比LISN输入端频谱与滤波器后端噪声；检查滤波器谐振峰、开关频率及其倍频。",
      "selection": "根据传导测试结果确定DM/CM级数，选X/Y电容安规等级，CMC额定电流与温升，阻尼电阻脉冲功率。",
      "debug": "加入滤波器后出现启动失败或低频振荡，检查输入滤波器与PFC负阻抗交互及阻尼。",
      "mistakes": "照搬参考设计的L/C数值，不验证实际线束、机壳接地和布局寄生。",
      "interfaces": "滤波器影响PFC输入电压采样与电流环；与整流桥、浪涌/NTC及接地结构共同决定EMC表现。",
      "questions": [
        "滤波器截止频率如何估算？",
        "为什么要给输入滤波器加阻尼？",
        "怎样验证滤波器没有破坏PFC稳定性？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-11",
      "module": "pfc",
      "number": 11,
      "title": "1kW PFC损耗与热设计：MOS、SiC、Bridge、电感、CMC",
      "status": "full",
      "summary": "PFC损耗由整流桥、MOS、升压二极管、电感铜损/磁芯损耗、驱动、控制和Bulk ESR组成。热设计必须用损耗拆分定位热点。",
      "formula": [
        "η=Pout/Pin",
        "Ptotal=Pin−Pout",
        "ΔT≈P·Rθ"
      ],
      "waveform": "记录MOS VDS/VGS、IL、二极管电流以及关键器件温度；温度稳态后再比较不同输入电压。",
      "selection": "分别估算导通、开关、反向恢复、磁芯、铜损和辅助电源损耗；按最差环境温度和散热边界校核结温。",
      "debug": "效率随输入电压变化异常，检查低线导通损耗与高线开关损耗；单个器件发热优先测其电压电流重叠。",
      "mistakes": "只看整机效率而不拆分损耗；用室温RDS(on)估算热态导通损耗。",
      "interfaces": "PFC热设计决定LLC可获得的总功率预算；整机风道、散热器和外壳温升必须一起验证。",
      "questions": [
        "PFC低线与高线的主要损耗可能有何不同？",
        "如何由温升估算热阻？",
        "为什么要把磁芯损耗和铜损分开？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-12",
      "module": "pfc",
      "number": 12,
      "title": "PFC电流采样：Shunt、CT、Hall、CSA、假OCP",
      "status": "full",
      "summary": "Shunt、CT、Hall和集成CSA各有带宽、隔离、损耗、偏置与成本权衡。采样链路要保证比例、极性、带宽和抗噪声。",
      "formula": [
        "Vshunt=I·Rshunt",
        "Pshunt=Irms²·Rshunt",
        "VADC=G·Vshunt+Voffset"
      ],
      "waveform": "比较真实电流探头与CS引脚波形；尖峰通常出现在开关沿，需区分真实电流与寄生振铃。",
      "selection": "Shunt采用Kelvin取样；CT核对伏秒和复位；Hall核对带宽/零漂；CSA核对共模范围、输入滤波和输出摆幅。",
      "debug": "误OCP先测CS脚与功率电流的同步关系，检查地弹、采样回路面积、RC时间常数和消隐。",
      "mistakes": "把大电流地线压降引入小信号采样；RC过大导致限流延迟，过小则噪声误触发。",
      "interfaces": "电流采样影响PFC内环和保护阈值；与功率地/信号地单点连接和布局强相关。",
      "questions": [
        "Kelvin采样为什么重要？",
        "CT饱和或复位不足有什么表现？",
        "RC滤波过大对OCP有什么风险？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-13",
      "module": "pfc",
      "number": 13,
      "title": "400V电压采样、OVP、Vin Sense、Brown-out检测",
      "status": "full",
      "summary": "VBUS分压用于母线调节/OVP，Vin Sense用于前馈、掉电检测和Brown-in/Brown-out。高压分压链需考虑耐压、功耗、精度和安全距离。",
      "formula": [
        "VADC=Vin·Rbot/(Rtop+Rbot)",
        "P_R=V²/R",
        "VOVP=Vref·(Rtop+Rbot)/Rbot"
      ],
      "waveform": "同步查看AC整流包络、Vin Sense、VBUS和FAULT；输入掉电时Vin Sense应先于母线跌落识别异常。",
      "selection": "高压电阻串联分担电压，按单颗工作电压和功耗降额；RC滤波与采样周期匹配，校准ADC偏置。",
      "debug": "Brown-out误判先检查分压阻值、地参考、RC滤波和阈值迟滞；OVP偏差检查参考源及电阻公差。",
      "mistakes": "单颗电阻承受过高电压；只校准满量程而不检查低线精度和浪涌。",
      "interfaces": "Vin Sense可参与PFC前馈和LLC功率管理；VBUS OVP应直接联锁关闭PFC与LLC。",
      "questions": [
        "为什么高压分压链常用多颗电阻串联？",
        "Brown-in和Brown-out为何需要迟滞？",
        "Vin Sense和VBUS Sense分别用于什么？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-14",
      "module": "pfc",
      "number": 14,
      "title": "PFC启动、VCC辅助供电、NTC/Relay预充和LLC Enable时序",
      "status": "full",
      "summary": "可靠启动顺序为输入检测/预充、辅助电源建立、PFC软启动、母线达到窗口、PGOOD确认，再允许LLC启动。关机顺序则要避免母线异常下的后级失控。",
      "formula": [
        "tpre≈−Rpre·Cbus·ln(1−Vth/Vin)",
        "Ppre≈V²/Rpre",
        "EN_LLC=PGOOD_PFC∧NoFault"
      ],
      "waveform": "捕获AC、VCC、VBUS、PFC_GATE、PGOOD和LLC_EN；关注继电器吸合前后母线压降及浪涌。",
      "selection": "预充电阻按能量和脉冲功率选型；继电器按母线电流和寿命选型；PFC辅助供电要覆盖启动与掉电阶段。",
      "debug": "启动反复重试时先查VCC UVLO、预充时间、母线阈值和PGOOD去抖，不要只盯EN脚。",
      "mistakes": "PFC未稳定就启动LLC；预充继电器吸合过早或辅助绕组供电时序不合理。",
      "interfaces": "PFC与LLC之间要有明确的PGOOD/FAULT握手；用户的双MCU方案还需定义隔离通信超时与安全默认状态。",
      "questions": [
        "为什么LLC应等待PFC母线稳定？",
        "预充电阻需要核算哪些参数？",
        "PGOOD抖动会造成什么系统故障？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-15",
      "module": "pfc",
      "number": 15,
      "title": "PFC故障波形综合诊断：VBUS、VCC、IL、VGS、FAULT",
      "status": "full",
      "summary": "PFC故障应以同步波形建立因果链：输入条件→母线→电感电流→驱动→保护状态。一次故障捕获要同时覆盖控制与功率节点。",
      "formula": [
        "Pin≈Pout/η",
        "ΔIL=VL·ton/L",
        "VDS,pk≈Vbus+Vspike"
      ],
      "waveform": "建议同步捕获Vin、VBUS、IL、VGS、VDS、VCC、CS和FAULT；保留故障前触发窗口及时间基准。",
      "selection": "建立低线满载、高线满载、轻载、动态负载、掉电恢复矩阵；探头接法和带宽设置要记录。",
      "debug": "VBUS跌落但IL不增：查输入限流/控制停机；IL突然陡升：查饱和/短路；VGS异常：查驱动和供电。",
      "mistakes": "只截取故障后的静态截图；探头长地线造成假尖峰；不同通道未做时延校准。",
      "interfaces": "故障诊断要分辨PFC本级和LLC负载反灌/突变；先确认FAULT来源再决定复位策略。",
      "questions": [
        "故障捕获至少同步哪些信号？",
        "如何区分电感饱和与输入源限流？",
        "为什么要保存故障前的波形？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-16",
      "module": "pfc",
      "number": 16,
      "title": "PFC电感完整设计：匝数、气隙、Ae、AL、ΔB、铜损、磁芯损耗",
      "status": "full",
      "summary": "PFC电感设计由电感量、峰值电流、纹波、磁通密度、磁芯损耗、铜损和温升共同约束。气隙储能通常占主要比例。",
      "formula": [
        "N≥L·Ipk/(Bmax·Ae)（近似）",
        "L≈μ0·N²·Ae/lg（气隙主导）",
        "Pcu=Irms²·Rac"
      ],
      "waveform": "测量IL纹波、峰值及关断斜率；电感饱和表现为电流斜率随电流上升而变陡。",
      "selection": "按85Vac满载计算峰值电流，选Ae/窗口面积；用磁芯厂商损耗曲线核算Pcore，按高温Isat和铜线Rac复核。",
      "debug": "实测L值与设计差异大，检查气隙、匝数和磁芯材料；温升高但电流不饱和，检查AC铜损与气隙边缘磁场。",
      "mistakes": "只按AL值或室温LCR值验收；忽略气隙公差、绕组邻近效应和磁芯高温损耗。",
      "interfaces": "PFC电感的电流波形决定控制环和器件应力；磁件也会影响EMI与后级母线稳定。",
      "questions": [
        "气隙对电感量和储能有什么作用？",
        "如何从电流斜率判断饱和？",
        "磁芯损耗和铜损分别如何降低？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-17",
      "module": "pfc",
      "number": 17,
      "title": "400V Bulk电容完整工程设计",
      "status": "full",
      "summary": "Bulk电容设计要从能量需求反推容量，再校核100/120Hz纹波电流、ESR、寿命、浪涌和母线最低工作电压。",
      "formula": [
        "C≥2·Pout·thold/[η·(Vhi²−Vlo²)]",
        "Iripple,rms由功率脉动与负载电流共同决定",
        "PESR=Iripple²·ESR"
      ],
      "waveform": "满载时VBUS有两倍工频纹波；AC掉电后母线从Vhi下降至Vlo，记录维持时间和LLC欠压停机点。",
      "selection": "按额定功率、效率、保持时间及LLC最低输入电压计算C；并联电容要核对纹波分配、温度和寿命。",
      "debug": "容量达标但温升过高，检查纹波电流额定值和ESR；母线跌落太快则检查实际负载功率和电容老化。",
      "mistakes": "仅按容量或耐压采购；忽略电解电容寿命随温度显著变化及并联均流。",
      "interfaces": "Bulk容量影响PFC动态和LLC保持时间；LLC功率阶跃是验证母线储能的关键工况。",
      "questions": [
        "保持时间计算为何要使用电压平方差？",
        "电容ESR会造成什么损耗？",
        "并联电解电容时要检查哪些参数？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-18",
      "module": "pfc",
      "number": 18,
      "title": "PFC效率、损耗拆分与完整测试矩阵",
      "status": "full",
      "summary": "效率测试需要建立输入电压、负载、温度和工作模式矩阵，并拆分主要损耗。热稳态、功率分析仪精度和测量接线决定数据可信度。",
      "formula": [
        "η=Pout/Pin",
        "Ptotal=Pin−Pout",
        "Pcomponent≈ΔT/Rθ（粗估）"
      ],
      "waveform": "记录输入电压电流、VBUS纹波、IL、关键器件温度和风道状态；测试点至少覆盖低线/高线与轻载/满载。",
      "selection": "使用校准功率分析仪和四线输出功率测量；固定风扇/外壳条件，温升到稳态后记录。",
      "debug": "效率异常先复测输入/输出功率接线，再按MOS、二极管、电感、整流桥和辅助电源逐项定位。",
      "mistakes": "在冷机或单一230Vac点测量后就下结论；忽略风扇功耗、待机功耗和仪器误差。",
      "interfaces": "PFC和LLC效率应分级测量，也要测整机效率；热设计和保护阈值共同决定持续输出能力。",
      "questions": [
        "为什么要分别测PFC和LLC效率？",
        "低线满载与高线轻载的损耗结构有何差别？",
        "如何判断温升是否达到稳态？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-19",
      "module": "pfc",
      "number": 19,
      "title": "传统Boost PFC与Totem-Pole PFC对比",
      "status": "full",
      "summary": "传统Boost PFC结构成熟、控制简单；Totem-Pole可减少整流桥损耗，但对器件反向导通、死区、驱动和EMI要求更高。",
      "formula": [
        "Pcond≈I²R",
        "Psw≈(Eon+Eoff)fs",
        "Pbridge≈2·Vf·Iavg"
      ],
      "waveform": "传统Boost观察整流桥压降与升压二极管换流；Totem-Pole重点观察高频桥臂VGS/VDS、死区和反向电流。",
      "selection": "比较效率、成本、控制器资源、器件耐压、驱动隔离和EMI；GaN/SiC器件需按实际开关速度和布局评估。",
      "debug": "Totem-Pole过零异常先查死区和电流极性判断；传统Boost效率低则拆分整流桥和二极管损耗。",
      "mistakes": "只看拓扑理论效率；忽略驱动复杂度、反向恢复、共模噪声和量产调试成本。",
      "interfaces": "拓扑选择决定PFC控制器、磁件和EMI方案，也影响后级母线质量及系统成本。",
      "questions": [
        "Totem-Pole为何能减少整流桥损耗？",
        "为什么其过零控制更复杂？",
        "何种功率等级和目标更适合评估Totem-Pole？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-20",
      "module": "pfc",
      "number": 20,
      "title": "1kW CCM Boost PFC完整设计流程",
      "status": "full",
      "summary": "完整CCM Boost PFC设计从输入边界、功率、母线、fs、纹波比出发，完成电感、MOS、二极管、电容、采样、环路、保护和热验证。",
      "formula": [
        "Iin,rms≈Pout/(η·PF·Vin,rms)",
        "D≈1−|vin|/Vbus",
        "ΔIL≈|vin|D/(Lfs)"
      ],
      "waveform": "用计算结果预测IL包络和纹波，再与实测波形对比；检查VBUS纹波、VDS尖峰和输入电流谐波。",
      "selection": "按85Vac/264Vac、轻载/满载计算四角工况；逐项完成磁件、器件、热、EMI和保护设计。",
      "debug": "计算与实测偏差大时逐一核对输入实际值、效率假设、L值、fs、探头比例和控制限幅。",
      "mistakes": "只按典型输入电压选器件；忽略启动、掉电、短路和器件公差。",
      "interfaces": "PFC设计输出为稳定400V母线和状态信号，作为半桥LLC输入与时序的边界条件。",
      "questions": [
        "PFC四角工况是哪四种？",
        "从输入功率到电感峰值电流的计算步骤是什么？",
        "设计冻结前需要完成哪些验证？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-21",
      "module": "pfc",
      "number": 21,
      "title": "数字PFC控制完整架构",
      "status": "full",
      "summary": "数字PFC由电压/电流采样、输入电压同步、控制算法、PWM更新、保护和状态机组成。控制时序与ADC采样点决定闭环性能。",
      "formula": [
        "i*ref=k·|vin|",
        "u[n]=u[n−1]+Kp·(e[n]−e[n−1])+Ki·Ts·e[n]（离散PI示例）",
        "Ts=1/fs"
      ],
      "waveform": "在PWM周期内固定采样相位，观察ADC采样值、PWM占空比、IL和VBUS；检查零交越同步与延迟。",
      "selection": "定义ADC分辨率/采样窗、DMA/ISR时序、PWM更新点、限幅与故障中断优先级；先做离线模型再上电。",
      "debug": "电流环噪声或不稳定，检查采样同步、ADC触发延迟、计算饱和与PWM更新错周期。",
      "mistakes": "把浮点算法直接放入高频ISR；忽略中断抖动、饱和恢复和故障中断抢占。",
      "interfaces": "PFC MCU需通过隔离通信向LLC MCU提供PGOOD、母线电压和故障状态；通信丢失时必须进入安全态。",
      "questions": [
        "为什么ADC采样需要与PWM同步？",
        "数字PI的积分饱和会造成什么问题？",
        "通信超时后PFC和LLC应如何进入安全状态？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "pfc-22",
      "module": "pfc",
      "number": 22,
      "title": "控制环补偿、动态负载、AC掉电/恢复与量产验证",
      "status": "full",
      "summary": "控制环补偿要在功率级工作点变化、输入电压范围和负载范围内保持稳定。还需验证负载阶跃、AC掉电恢复和保护重启。",
      "formula": [
        "PM=180°+∠T(jωc)",
        "GM=−20log10|T(jω180)|（dB定义）",
        "fBW≪fs"
      ],
      "waveform": "注入小信号测环路增益；动态负载观察VBUS过冲/跌落、IL恢复和LLC输入欠压。",
      "selection": "在低线/高线、轻载/满载多点验证相位裕度与增益裕度；设计软启动、限功率、恢复斜率和重试策略。",
      "debug": "母线振荡先区分PFC电压环与LLC恒功率负载交互；检查环路交越频率、采样延迟和限幅。",
      "mistakes": "只在单一工作点调环路；AC恢复时直接满功率启动导致母线过冲或输入浪涌。",
      "interfaces": "PFC电压环与LLC功率控制形成级联系统；系统验证必须同时记录两级状态与隔离通信。",
      "questions": [
        "环路相位裕度不足会出现什么现象？",
        "为何要在多个输入/负载工作点验证环路？",
        "AC掉电恢复时为什么需要受控功率爬升？"
      ],
      "source_note": "工程化课程：结合85～264Vac、400V母线、600W～1kW CCM Boost PFC场景整理；公式为一阶设计关系，最终以控制器资料和实测校核。"
    },
    {
      "id": "mag-01",
      "module": "mag",
      "number": 1,
      "title": "磁路基础：B、H、磁通Φ、磁阻与饱和",
      "status": "full",
      "summary": "气隙增加磁路磁阻、降低AL值并提高储能能力；对有直流偏置的电感，气隙通常是储能和防饱和的关键。气隙边缘磁场会增加邻近绕组的附加损耗。",
      "formula": [
        "L≈μ0·N²·Ae/lg（气隙主导）",
        "W=½·L·I²",
        "lg≈μ0·N²·Ae/L"
      ],
      "waveform": "在固定电压下，电感电流斜率为di/dt=V/L；电流逐渐上升时斜率变陡，可能表示磁芯接近饱和。",
      "selection": "先确定L、Ipk、允许Bmax和Ae，再反推匝数与气隙；计算需加入磁芯磁阻、边缘效应、气隙公差和高温裕量。",
      "debug": "L值偏小先核对匝数和气隙；空载L正常而大电流下明显下降，检查磁芯饱和。",
      "mistakes": "只用简单气隙公式作为最终值；忽略磁芯磁阻、分段气隙、气隙边缘场和加工公差。",
      "interfaces": "PFC电感需承受直流偏置；LLC的Lm也由磁路决定，过大/过小会改变励磁电流和ZVS条件。",
      "questions": [
        "气隙增加时AL值如何变化？",
        "为什么气隙边缘会增加绕组损耗？",
        "怎样通过大电流电感斜率判断饱和？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-02",
      "module": "mag",
      "number": 2,
      "title": "磁芯材料与磁芯损耗：Ferrite、Sendust、High-Flux、MPP、纳米晶",
      "status": "full",
      "summary": "PFC储能电感需同时满足电感量、峰值电流、纹波、磁通密度、磁芯损耗和铜损。磁芯选型不能只看标称电感量。",
      "formula": [
        "Ipk≈Iavg+ΔIL/2",
        "ΔB≈L·ΔI/(N·Ae)",
        "Pcu=Irms²·Rac"
      ],
      "waveform": "记录输入半周内的IL包络和高频纹波；关注电流峰值附近斜率是否非线性，以及电感温升位置。",
      "selection": "按85Vac满载计算Ipk；核对磁芯Ae/Aw、Isat热态曲线、匝数、线径、填充率、气隙和绝缘。",
      "debug": "带载后L值下降、峰值电流突然增加，优先检查磁芯饱和和气隙；温升异常检查Rac和气隙边缘场。",
      "mistakes": "仅按Irms或磁芯Bsat典型值选型；没有做热态和公差验证。",
      "interfaces": "电感饱和会导致PFC OCP、MOS应力增加和母线失稳；磁件EMI与布局也需联动。",
      "questions": [
        "PFC电感的最坏Ipk通常出现在哪种工况？",
        "为什么Isat要按工作温度降额？",
        "磁芯窗口面积如何约束线径和匝数？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-03",
      "module": "mag",
      "number": 3,
      "title": "匝数、Ae、伏秒与磁通密度完整计算",
      "status": "full",
      "summary": "LLC可采用独立谐振电感，也可利用变压器漏感形成部分Lr。集成设计能减少器件，但对绕组结构、漏感一致性和量产公差更敏感。",
      "formula": [
        "fr=1/(2π√(Lr·Cr))",
        "Lm/Lr决定增益与励磁电流权衡",
        "Lr,total=Lr,external+Llk（设计等效）"
      ],
      "waveform": "用开路/短路电感测量估算Lm和Llk；运行时观察iLr是否连续、是否出现波形不对称及异常振铃。",
      "selection": "先确定Lr、Lm和变比目标，再决定外置电感或集成漏感；样品要测多台Llk分布并验证温度。",
      "debug": "谐振频率偏差先检查Cr容差、Lr/Llk测量方法和绕组位置；批次差异大检查绕组工艺。",
      "mistakes": "将漏感视为完全固定参数；忽略绕组位置、屏蔽层和夹具对测量的影响。",
      "interfaces": "Lr/Lm直接决定LLC增益曲线、ZVS区和循环电流；与半桥开关频率控制紧密耦合。",
      "questions": [
        "如何用开路/短路测试估算Lm与Llk？",
        "集成漏感的主要量产风险是什么？",
        "Lr偏差会如何改变谐振频率？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-04",
      "module": "mag",
      "number": 4,
      "title": "线径、趋肤效应、邻近效应与高频绕组设计",
      "status": "full",
      "summary": "高频变压器绝缘要同时满足基本/加强绝缘、爬电距离、电气间隙、耐压、绕组温升和结构工艺。屏蔽层必须明确接地点，避免形成短路匝。",
      "formula": [
        "E=V/d（仅用于均匀场粗估，不作安规判据）",
        "Piso与材料耐压按标准/认证要求核对",
        "Cpar≈εA/d"
      ],
      "waveform": "共模电流异常时检查原副边寄生电容；耐压测试前确认绕组、屏蔽和磁芯接线，避免误判。",
      "selection": "根据工作电压、过电压类别、污染等级、材料组别和适用标准确定距离；使用认可绝缘线、胶带、骨架和挡墙。",
      "debug": "耐压漏电先分段隔离绕组、骨架、引线和屏蔽；EMI改善后耐压下降，检查屏蔽边缘和绝缘覆盖。",
      "mistakes": "仅按经验留间距；屏蔽铜箔闭合一圈形成短路匝；引线交叉造成局部电气间隙不足。",
      "interfaces": "隔离变压器是PFC高压侧与低压输出的安全边界；LLC同步整流侧的Y电容和通信隔离也需统一评估。",
      "questions": [
        "爬电距离和电气间隙有什么区别？",
        "为什么屏蔽层不能形成闭合短路匝？",
        "变压器耐压测试前需要检查哪些连接？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-05",
      "module": "mag",
      "number": 5,
      "title": "窗口面积、填充系数与绕组排布",
      "status": "full",
      "summary": "磁性件总损耗由磁芯损耗和绕组交流铜损构成。高频下趋肤、邻近效应及气隙边缘磁场会使Rac显著高于直流电阻。",
      "formula": [
        "Pcore≈k·f^α·B^β·Ve（Steinmetz形式）",
        "Pcu=Irms²·Rac",
        "δ≈√(ρ/(πfμ))"
      ],
      "waveform": "记录绕组电流频谱和热点分布；若电流正常而绕组局部发热，检查层间邻近效应和气隙边缘场。",
      "selection": "使用磁芯厂商在实际频率/磁通/温度下的损耗曲线；估算Rac、线束填充率和散热路径，最终做热稳态验证。",
      "debug": "磁芯中心热点偏向Pcore；靠近气隙或绕组边缘热点可能来自fringing/邻近效应，拆分测量确认。",
      "mistakes": "把室温DCR当作高频铜损；只用单一Bsat参数估算磁芯温升。",
      "interfaces": "PFC电感和LLC变压器均需磁芯/铜损拆分；磁件温升会改变电感量和系统工作点。",
      "questions": [
        "Steinmetz公式中的f和B分别代表什么？",
        "为什么Litz线需要控制单股线径？",
        "气隙附近绕组发热可能是什么原因？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-06",
      "module": "mag",
      "number": 6,
      "title": "漏感Llk、励磁电感Lm与耦合系数k",
      "status": "full",
      "summary": "磁性件样品验收需包含L、DCR、开路/短路参数、匝比、极性、耐压、绝缘电阻和温升。测量夹具、频率与电平必须记录。",
      "formula": [
        "L=N²/ℜ",
        "k=M/√(L1·L2)",
        "Pcu=I²Rac"
      ],
      "waveform": "对比样品与设计的电感量、谐振频率和温升；示波器观察驱动/电流波形，避免仅凭LCR单点数值验收。",
      "selection": "制定测试条件表：LCR频率/电平、DCR四线法、开短路接线、耐压电压/时间/漏电流、温升负载和环境。",
      "debug": "参数漂移先排除夹具/绕线引线影响，再检查磁芯气隙、匝数、胶带厚度和绕组位置。",
      "mistakes": "不同样品使用不同LCR频率或夹具；耐压测试前后未记录漏电流和绝缘状态。",
      "interfaces": "磁件验收结果要反馈到PFC控制参数和LLC谐振频率/变比；样品批次差异需要进入设计裕量。",
      "questions": [
        "磁性件样品至少需要哪些电气测试？",
        "为什么开短路测量必须固定夹具和频率？",
        "如何建立磁件量产验收记录？"
      ],
      "source_note": "工程化磁性器件讲义；磁芯损耗与安规参数须以具体厂商资料、适用标准和样品测试为准。"
    },
    {
      "id": "mag-07",
      "module": "mag",
      "number": 7,
      "title": "气隙设计、励磁电感调整与储能能力计算",
      "status": "full",
      "summary": "气隙增加磁路磁阻、降低AL值并提高储能能力；对有直流偏置的电感，气隙通常是储能和防饱和的关键。气隙边缘磁场会增加邻近绕组的附加损耗。",
      "formula": [
        "L≈μ0·N²·Ae/lg（气隙主导）",
        "W=½·L·I²",
        "lg≈μ0·N²·Ae/L"
      ],
      "waveform": "在固定电压下，电感电流斜率为di/dt=V/L；电流逐渐上升时斜率变陡，可能表示磁芯接近饱和。",
      "selection": "先确定L、Ipk、允许Bmax和Ae，再反推匝数与气隙；计算需加入磁芯磁阻、边缘效应、气隙公差和高温裕量。",
      "debug": "L值偏小先核对匝数和气隙；空载L正常而大电流下明显下降，检查磁芯饱和。",
      "mistakes": "只用简单气隙公式作为最终值；忽略磁芯磁阻、分段气隙、气隙边缘场和加工公差。",
      "interfaces": "PFC电感需承受直流偏置；LLC的Lm也由磁路决定，过大/过小会改变励磁电流和ZVS条件。",
      "questions": [
        "气隙增加时AL值如何变化？",
        "为什么气隙边缘会增加绕组损耗？",
        "怎样通过大电流电感斜率判断饱和？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "mag-08",
      "module": "mag",
      "number": 8,
      "title": "PFC储能电感实战：磁芯、匝数、气隙与峰值电流",
      "status": "full",
      "summary": "PFC储能电感需同时满足电感量、峰值电流、纹波、磁通密度、磁芯损耗和铜损。磁芯选型不能只看标称电感量。",
      "formula": [
        "Ipk≈Iavg+ΔIL/2",
        "ΔB≈L·ΔI/(N·Ae)",
        "Pcu=Irms²·Rac"
      ],
      "waveform": "记录输入半周内的IL包络和高频纹波；关注电流峰值附近斜率是否非线性，以及电感温升位置。",
      "selection": "按85Vac满载计算Ipk；核对磁芯Ae/Aw、Isat热态曲线、匝数、线径、填充率、气隙和绝缘。",
      "debug": "带载后L值下降、峰值电流突然增加，优先检查磁芯饱和和气隙；温升异常检查Rac和气隙边缘场。",
      "mistakes": "仅按Irms或磁芯Bsat典型值选型；没有做热态和公差验证。",
      "interfaces": "电感饱和会导致PFC OCP、MOS应力增加和母线失稳；磁件EMI与布局也需联动。",
      "questions": [
        "PFC电感的最坏Ipk通常出现在哪种工况？",
        "为什么Isat要按工作温度降额？",
        "磁芯窗口面积如何约束线径和匝数？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "mag-09",
      "module": "mag",
      "number": 9,
      "title": "LLC谐振电感Lr与变压器集成设计",
      "status": "full",
      "summary": "LLC可采用独立谐振电感，也可利用变压器漏感形成部分Lr。集成设计能减少器件，但对绕组结构、漏感一致性和量产公差更敏感。",
      "formula": [
        "fr=1/(2π√(Lr·Cr))",
        "Lm/Lr决定增益与励磁电流权衡",
        "Lr,total=Lr,external+Llk（设计等效）"
      ],
      "waveform": "用开路/短路电感测量估算Lm和Llk；运行时观察iLr是否连续、是否出现波形不对称及异常振铃。",
      "selection": "先确定Lr、Lm和变比目标，再决定外置电感或集成漏感；样品要测多台Llk分布并验证温度。",
      "debug": "谐振频率偏差先检查Cr容差、Lr/Llk测量方法和绕组位置；批次差异大检查绕组工艺。",
      "mistakes": "将漏感视为完全固定参数；忽略绕组位置、屏蔽层和夹具对测量的影响。",
      "interfaces": "Lr/Lm直接决定LLC增益曲线、ZVS区和循环电流；与半桥开关频率控制紧密耦合。",
      "questions": [
        "如何用开路/短路测试估算Lm与Llk？",
        "集成漏感的主要量产风险是什么？",
        "Lr偏差会如何改变谐振频率？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "mag-10",
      "module": "mag",
      "number": 10,
      "title": "高频变压器绝缘设计：爬电距离、电气间隙与屏蔽",
      "status": "full",
      "summary": "高频变压器绝缘要同时满足基本/加强绝缘、爬电距离、电气间隙、耐压、绕组温升和结构工艺。屏蔽层必须明确接地点，避免形成短路匝。",
      "formula": [
        "E=V/d（仅用于均匀场粗估，不作安规判据）",
        "Piso与材料耐压按标准/认证要求核对",
        "Cpar≈εA/d"
      ],
      "waveform": "共模电流异常时检查原副边寄生电容；耐压测试前确认绕组、屏蔽和磁芯接线，避免误判。",
      "selection": "根据工作电压、过电压类别、污染等级、材料组别和适用标准确定距离；使用认可绝缘线、胶带、骨架和挡墙。",
      "debug": "耐压漏电先分段隔离绕组、骨架、引线和屏蔽；EMI改善后耐压下降，检查屏蔽边缘和绝缘覆盖。",
      "mistakes": "仅按经验留间距；屏蔽铜箔闭合一圈形成短路匝；引线交叉造成局部电气间隙不足。",
      "interfaces": "隔离变压器是PFC高压侧与低压输出的安全边界；LLC同步整流侧的Y电容和通信隔离也需统一评估。",
      "questions": [
        "爬电距离和电气间隙有什么区别？",
        "为什么屏蔽层不能形成闭合短路匝？",
        "变压器耐压测试前需要检查哪些连接？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "mag-11",
      "module": "mag",
      "number": 11,
      "title": "磁芯损耗、绕组铜损与温升估算",
      "status": "full",
      "summary": "磁性件总损耗由磁芯损耗和绕组交流铜损构成。高频下趋肤、邻近效应及气隙边缘磁场会使Rac显著高于直流电阻。",
      "formula": [
        "Pcore≈k·f^α·B^β·Ve（Steinmetz形式）",
        "Pcu=Irms²·Rac",
        "δ≈√(ρ/(πfμ))"
      ],
      "waveform": "记录绕组电流频谱和热点分布；若电流正常而绕组局部发热，检查层间邻近效应和气隙边缘场。",
      "selection": "使用磁芯厂商在实际频率/磁通/温度下的损耗曲线；估算Rac、线束填充率和散热路径，最终做热稳态验证。",
      "debug": "磁芯中心热点偏向Pcore；靠近气隙或绕组边缘热点可能来自fringing/邻近效应，拆分测量确认。",
      "mistakes": "把室温DCR当作高频铜损；只用单一Bsat参数估算磁芯温升。",
      "interfaces": "PFC电感和LLC变压器均需磁芯/铜损拆分；磁件温升会改变电感量和系统工作点。",
      "questions": [
        "Steinmetz公式中的f和B分别代表什么？",
        "为什么Litz线需要控制单股线径？",
        "气隙附近绕组发热可能是什么原因？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "mag-12",
      "module": "mag",
      "number": 12,
      "title": "磁性器件样品测试：LCR、开短路、耐压与温升",
      "status": "full",
      "summary": "磁性件样品验收需包含L、DCR、开路/短路参数、匝比、极性、耐压、绝缘电阻和温升。测量夹具、频率与电平必须记录。",
      "formula": [
        "L=N²/ℜ",
        "k=M/√(L1·L2)",
        "Pcu=I²Rac"
      ],
      "waveform": "对比样品与设计的电感量、谐振频率和温升；示波器观察驱动/电流波形，避免仅凭LCR单点数值验收。",
      "selection": "制定测试条件表：LCR频率/电平、DCR四线法、开短路接线、耐压电压/时间/漏电流、温升负载和环境。",
      "debug": "参数漂移先排除夹具/绕线引线影响，再检查磁芯气隙、匝数、胶带厚度和绕组位置。",
      "mistakes": "不同样品使用不同LCR频率或夹具；耐压测试前后未记录漏电流和绝缘状态。",
      "interfaces": "磁件验收结果要反馈到PFC控制参数和LLC谐振频率/变比；样品批次差异需要进入设计裕量。",
      "questions": [
        "磁性件样品至少需要哪些电气测试？",
        "为什么开短路测量必须固定夹具和频率？",
        "如何建立磁件量产验收记录？"
      ],
      "source_note": "工程化磁性器件讲义；最终参数以磁芯厂商曲线、安规要求和样品测试为准。"
    },
    {
      "id": "llc-01",
      "module": "llc",
      "number": 1,
      "title": "半桥 LLC 拓扑：400V母线到隔离低压输出",
      "status": "full",
      "summary": "半桥LLC通过半桥开关产生高频方波，谐振腔将能量传至隔离变压器，副边整流输出。其主要调节手段是改变开关频率。",
      "formula": [
        "VHB≈0/Vbus两电平，交流分量幅值约Vbus/2",
        "fr=1/(2π√(Lr·Cr))",
        "Pout=Vout·Iout"
      ],
      "waveform": "观察半桥中点VHB、谐振电流iLr、励磁电流iLm、原边MOS VDS/VGS及副边整流电流。",
      "selection": "先明确PFC母线范围、输出电压/电流、隔离要求和额定功率，再确定半桥/全桥、SR和变压器结构。",
      "debug": "启动无输出先查母线、驱动互补关系、死区、谐振电流路径和变压器极性。",
      "mistakes": "把半桥谐振腔误按全桥激励计算；忽略半桥中点电压摆幅与变压器伏秒。",
      "interfaces": "前级PFC提供390～400V母线；LLC的PGOOD、FAULT与PFC MCU通过隔离通信交互。",
      "questions": [
        "半桥LLC中点电压的两个主要电平是什么？",
        "LLC通常通过什么变量调节输出？",
        "为什么需要观察iLr和iLm两条电流？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-02",
      "module": "llc",
      "number": 2,
      "title": "谐振腔 Lr、Cr、Lm 与两个特征谐振频率",
      "status": "full",
      "summary": "串联谐振电感Lr、谐振电容Cr和励磁电感Lm决定谐振特性。串联谐振频率fr与包含Lm的低频特征频率共同影响增益曲线。",
      "formula": [
        "fr=1/(2π√(Lr·Cr))",
        "fm=1/(2π√((Lr+Lm)·Cr))",
        "m=(Lr+Lm)/Lr"
      ],
      "waveform": "iLr在谐振附近近似正弦；iLm近似分段线性；iLr与iLm之差对应变压器负载反射电流。",
      "selection": "先选Cr电压/电流额定值，再由目标fr反推Lr；结合变压器漏感决定外置Lr或集成漏感。",
      "debug": "谐振点偏移先测Cr实际容量和Lr；若随负载变化明显，检查Lm及漏感测量。",
      "mistakes": "把Lr和Lm混为一谈；只按标称值设计，不检查容差、偏置和温升。",
      "interfaces": "谐振腔参数决定增益和ZVS；变压器漏感可成为Lr的一部分，和磁件结构必须共同设计。",
      "questions": [
        "fr和fm的表达式分别是什么？",
        "Lr增加会怎样改变谐振频率？",
        "Lm/Lr比值为什么影响励磁电流？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-03",
      "module": "llc",
      "number": 3,
      "title": "FHA 基波近似、增益曲线与工作区判断",
      "status": "full",
      "summary": "FHA将方波和整流负载折算为基波等效网络，用于初步推导LLC增益。最终设计需用时域仿真和实测校核，特别是轻载和换流区。",
      "formula": [
        "M=|Vout/Vin,eq|（按变比定义）",
        "Q=√(Lr/Cr)/Rac",
        "f_n=fs/fr"
      ],
      "waveform": "绘制增益M随归一化频率fn变化的曲线；标注额定点、最低/最高输入、输出调节端点和感性工作区。",
      "selection": "按最小/最大母线和输出电压范围确定所需增益窗口，选择Q、Lm/Lr和fr后检查所有工况。",
      "debug": "输出调节边界不足时检查变比、母线范围、Q和频率上下限，不要只提高频率上限。",
      "mistakes": "只在fr一个点计算变比；忽略FHA假设在轻载、强非线性整流时的误差。",
      "interfaces": "PFC母线变化会改变LLC所需增益；输出端负载和SR压降也会影响实际增益。",
      "questions": [
        "归一化频率fn如何定义？",
        "Q值变化如何影响增益曲线？",
        "FHA为什么需要仿真和实测补充？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-04",
      "module": "llc",
      "number": 4,
      "title": "变压器匝比设计：覆盖输入母线与输出电压范围",
      "status": "full",
      "summary": "变压器匝比决定母线到输出的基本电压映射。设计必须覆盖PFC母线容差、输出调节范围、整流压降和LLC可用增益。",
      "formula": [
        "n=Np/Ns",
        "Vsec,eq由VHB、n和整流方式决定",
        "Mreq=Vout/Vout,nominal（相对增益）"
      ],
      "waveform": "观察变压器原边方波电压和副边整流电压；低输出/高输出端点分别检查频率是否超出可控范围。",
      "selection": "以400V母线为中心，带入PFC最低/最高母线、输出60～93V及整流压降，求所需增益范围后定匝比。",
      "debug": "输出高端无法降压或低端无法升压，检查匝比、母线窗口和频率范围。",
      "mistakes": "只按典型86V输出选匝比；忽略输出电压可调范围和整流压降。",
      "interfaces": "变比同时影响原边电流、SR电压应力和变压器绝缘；与PFC母线设定及输出电流环相关。",
      "questions": [
        "匝比过大对原边电流和副边电压有何影响？",
        "为什么要按输出范围两端计算增益？",
        "SR压降如何影响变比设计？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-05",
      "module": "llc",
      "number": 5,
      "title": "ZVS实现条件、MOS Coss与死区时间",
      "status": "full",
      "summary": "ZVS要求MOS开通前，谐振/励磁电流在死区内完成开关节点电容换流，使待开通MOS的VDS降至接近零。死区过短或电流不足都会失ZVS。",
      "formula": [
        "½·Lcomm·I² ≥ Eoss,eq（能量近似）",
        "tdead需覆盖Coss换流时间",
        "Psw与VDS(on)时刻重叠相关"
      ],
      "waveform": "同时看VDS和VGS：理想情况VDS在VGS上升前已降到接近零；若VGS先上升且VDS仍高，存在硬开通。",
      "selection": "使用器件Eoss/Coss曲线而非单一小信号Coss估算；在轻载、低线/高线、温度角落验证死区。",
      "debug": "轻载失ZVS检查励磁电流、Lm、频率、死区和寄生电容；过长死区检查体二极管导通损耗。",
      "mistakes": "把死区设得越长越好；忽略Coss非线性和驱动传播延迟差异。",
      "interfaces": "ZVS依赖Lr/Lm、变压器和MOS参数；PFC母线偏高会提高换流能量需求。",
      "questions": [
        "怎样从VDS/VGS确认ZVS？",
        "为什么轻载更容易失ZVS？",
        "死区过长会带来哪些损耗？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-06",
      "module": "llc",
      "number": 6,
      "title": "Lm/Lr比值、励磁电流与循环电流设计",
      "status": "full",
      "summary": "Lm决定励磁电流大小，Lr决定谐振电流和谐振频率。Lm/Lr比例是增益、循环电流、ZVS能力和器件损耗之间的重要折中。",
      "formula": [
        "ILm,pk≈Vpri·ton/(2Lm)（线性斜坡估算）",
        "fr=1/(2π√(LrCr))",
        "Ipri≈ILr−ILm（按电流参考方向）"
      ],
      "waveform": "观察iLr与iLm差值；轻载时励磁电流占比提高，满载时负载反射电流增大。",
      "selection": "结合最小负载ZVS、满载RMS电流和变压器窗口选择Lm/Lr；在极限频率点核对磁通和温升。",
      "debug": "轻载ZVS不足可评估降低Lm或改变频率范围；满载循环电流大则检查Lm过小和设计Q值。",
      "mistakes": "只追求大Lm降低空载损耗，结果轻载失ZVS；或Lm过小造成满载循环电流过大。",
      "interfaces": "Lm由变压器磁路/气隙决定；Lr由外置电感或漏感决定，两者都影响PFC母线到输出的动态。",
      "questions": [
        "Lm过大可能导致什么轻载问题？",
        "Lm过小为什么会增加循环电流？",
        "如何通过iLr与iLm波形区分负载电流？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-07",
      "module": "llc",
      "number": 7,
      "title": "同步整流SR时序：导通窗口与反向电流",
      "status": "full",
      "summary": "同步整流MOS需要在副边电流有效方向内导通，并在电流接近零或反向前关断。时序错误会产生反向电流、交叉导通和效率下降。",
      "formula": [
        "Pcond≈Irms²·RDS(on)",
        "Pgate≈Qg·Vdrive·fs",
        "SR关断应早于电流反向"
      ],
      "waveform": "同时观察副边电流、SR VGS和VDS；重点看换流死区、零电流附近是否出现反向电流。",
      "selection": "选择低RDS(on)、合适Qg和耐压的SR MOS；驱动需有可靠关断、反向电流检测和故障保护。",
      "debug": "SR MOS发热或输出轻载异常，检查导通窗口、极性、检测延迟和关断阈值。",
      "mistakes": "仅用固定延时控制所有负载；忽略寄生振铃造成的误导通和电流反向。",
      "interfaces": "SR控制与LLC原边谐振相位耦合；输出短路/过流时应与原边停机协调。",
      "questions": [
        "SR为何必须在电流反向前关断？",
        "Qg和RDS(on)如何影响效率？",
        "如何通过VGS和副边电流确认SR时序？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-08",
      "module": "llc",
      "number": 8,
      "title": "启动、软启动、扫频与故障重启策略",
      "status": "full",
      "summary": "LLC启动需要受控建立谐振电流与输出电压。常见策略从较高频率起步并逐步扫向目标工作点，但具体起始频率与增益方向需按设计曲线确认。",
      "formula": [
        "fs,start通常选在可控的低增益区",
        "Vout软启动斜率受负载和环路限制",
        "Ipk<Ilimit"
      ],
      "waveform": "捕获启动频率轨迹、VHB、iLr、Vout和FAULT；确认没有频率跳变、过流或输出过冲。",
      "selection": "定义预充完成、母线有效、驱动供电有效、软启动斜率、频率限幅、OCP/OVP和重试间隔。",
      "debug": "启动打嗝先查母线就绪、驱动UVLO、频率初值、变压器极性和负载预偏置。",
      "mistakes": "启动直接从额定频率满占空；频率限幅未考虑最小/最大增益和电流峰值。",
      "interfaces": "PFC PGOOD后才允许LLC启动；PFC故障或通信超时应使LLC进入安全关断。",
      "questions": [
        "LLC为什么需要软启动？",
        "起始频率应如何结合增益曲线选择？",
        "打嗝重启要记录哪些波形？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-09",
      "module": "llc",
      "number": 9,
      "title": "数字频率控制、反馈环路与动态负载",
      "status": "full",
      "summary": "数字LLC通常通过频率命令调节输出，外层电压/电流环产生频率指令，状态机负责启动、限流、保护和模式切换。采样与PWM更新延迟需纳入环路。",
      "formula": [
        "f_cmd=Limit(f0+u_PI)",
        "u_PI=Kp·e+Ki∫e dt",
        "Δf/Δt限制用于软启动"
      ],
      "waveform": "记录Vout、Iout、频率命令、实际频率和谐振电流；负载阶跃时观察频率是否触顶/触底。",
      "selection": "建立频率-增益查表或经验证的控制模型；设定输出电压/电流限幅、频率斜率和积分抗饱和。",
      "debug": "输出振荡先确认频率指令是否抖动、反馈采样是否同步、频率限幅是否频繁触发。",
      "mistakes": "把频率命令当作线性占空比；忽略LLC增益非线性和工作区切换。",
      "interfaces": "PFC与LLC双MCU隔离通信需定义母线数据、使能、故障和超时；不能依赖通信维持硬件保护。",
      "questions": [
        "LLC与Buck的占空比控制有何不同？",
        "频率限幅为什么会影响动态响应？",
        "数字控制需要哪些抗积分饱和措施？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-10",
      "module": "llc",
      "number": 10,
      "title": "MOSFET损耗、变压器温升与散热设计",
      "status": "full",
      "summary": "LLC损耗包含原边MOS导通/开关/体二极管损耗、谐振电流铜损、变压器磁芯/绕组损耗、SR损耗和驱动损耗。散热设计要按最差输出点验证。",
      "formula": [
        "Pcond≈Irms²·RDS(on)",
        "Pcu≈Irms²·Rac",
        "η=Pout/Pin"
      ],
      "waveform": "在低输出电压大电流、高输出电压高频和轻载等点测MOS、变压器、谐振电感和SR温升。",
      "selection": "按实际RMS电流、Eoss、Qg、Rac和磁芯损耗计算；热像仪定位热点，热电偶验证稳态。",
      "debug": "效率低但器件温度分散，检查循环电流和频率；单点热点检查布局、散热器接触和磁件损耗。",
      "mistakes": "只按额定功率和典型输出点散热；忽略输出电压可调范围造成的电流/频率变化。",
      "interfaces": "PFC和LLC热源共享机箱与风道；系统热设计需考虑两级同时满载和环境温度。",
      "questions": [
        "LLC有哪些主要损耗项？",
        "为什么输出低压大电流点可能更热？",
        "如何区分磁芯损耗和绕组损耗？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-11",
      "module": "llc",
      "number": 11,
      "title": "LLC关键波形与故障诊断：失ZVS、过流、啸叫",
      "status": "full",
      "summary": "LLC波形诊断要同时观察半桥节点、VGS/VDS、iLr、iLm、副边SR和输出。波形异常应结合工作频率、负载和母线条件定位。",
      "formula": [
        "fr=1/(2π√(LrCr))",
        "VDS开通前降至近零为ZVS证据",
        "Ipri≈ILr−ILm"
      ],
      "waveform": "失ZVS看VDS在VGS上升时是否仍高；谐振过流看iLr峰值；啸叫需检查Burst/低频包络和磁件机械振动。",
      "selection": "建立低/额定/高输出、轻/满载、低/高母线的波形基线；差分探头测半桥节点，电流探头校准方向。",
      "debug": "输出掉压先查限流与频率是否触顶；VDS尖峰查布局/寄生；SR反向电流查关断时序。",
      "mistakes": "只看输出电压判断LLC正常；将探头接地错误造成的半桥波形异常当成电路故障。",
      "interfaces": "异常可能源于PFC母线波动，也可能是LLC谐振参数或SR控制；先确认母线再分析谐振腔。",
      "questions": [
        "失ZVS最直接的波形证据是什么？",
        "谐振电流异常增大优先检查哪些参数？",
        "为什么要把PFC母线一起记录？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "llc-12",
      "module": "llc",
      "number": 12,
      "title": "800W半桥LLC工程实例：400V输入、60～93V输出",
      "status": "full",
      "summary": "以用户当前平台为例：CCM PFC提供390～400Vdc母线，半桥LLC输出60～93V、2～8A，最大输出约744W，配置同步整流。设计需覆盖电压和电流两维调节范围。",
      "formula": [
        "Pout,max=93V·8A=744W",
        "Pin=Pout/η",
        "Iout=2～8A；Vout=60～93V"
      ],
      "waveform": "验证400V母线、半桥VHB、iLr/iLm、原边VDS/VGS、副边SR VGS和输出纹波；在60V/8A与93V/8A等边界点记录温升。",
      "selection": "先定输出功率和整流方式，再定变比、Lr/Cr/Lm、fs范围、SR MOS和散热；将PFC母线容差纳入增益边界。",
      "debug": "低输出大电流过热检查SR和铜损；高输出端调节不足检查匝比/频率范围；动态掉压检查环路和母线储能。",
      "mistakes": "把800W平台能力当作所有输出点都可持续满载；忽略744W规格边界、温升和散热条件。",
      "interfaces": "前级PFC目标390～400V；LLC MCU通过隔离串口接收母线/故障状态，保护仍需本地硬件独立完成。",
      "questions": [
        "93V/8A输出功率是多少？",
        "为什么要验证60V/8A和93V/8A边界点？",
        "PFC母线变化会如何影响LLC频率和增益？"
      ],
      "source_note": "以400V母线半桥LLC和同步整流为主线；FHA/损耗公式用于初步估算，最终需结合器件数据手册、仿真和实测。"
    },
    {
      "id": "flyback-01",
      "module": "flyback",
      "number": 1,
      "title": "反激变换器工作原理：储能与副边释放能量",
      "status": "full",
      "summary": "反激变换器开通时能量储存在变压器励磁电感中，关断时副边二极管导通并向负载/电容释放能量。反激变压器本质上是耦合储能电感。",
      "formula": [
        "W=½·Lm·Ipk²",
        "Pout≈η·½·Lm·Ipk²·fs（DCM估算）",
        "Vout由匝比、占空比和工作模式决定"
      ],
      "waveform": "MOS导通时原边电流线性上升、副边整流器截止；MOS关断时原边VDS上升、副边电流导通并逐渐下降。",
      "selection": "先确定输入范围、输出功率、工作模式、fs和最大占空比，再定匝比、Lm、磁芯和钳位。",
      "debug": "启动无输出先查VCC、辅助绕组极性、MOS驱动、次级整流极性和反馈。",
      "mistakes": "把反激变压器当普通正激变压器；忽略励磁电感储能和气隙。",
      "interfaces": "前级整流/PFC决定输入母线；反激输出反馈和辅助绕组供电会影响启动和稳定。",
      "questions": [
        "反激开通期间能量主要存在哪里？",
        "为什么反激变压器需要储能气隙？",
        "MOS关断时副边为什么开始导通？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-02",
      "module": "flyback",
      "number": 2,
      "title": "DCM、BCM、CCM边界与电流波形",
      "status": "full",
      "summary": "DCM每周期励磁电流回到零并有空闲时间；BCM恰好在下一周期前回零；CCM则保留谷值电流。模式决定峰值电流、RMS电流和控制特性。",
      "formula": [
        "ΔIp=Vin·D/(Lm·fs)",
        "Ivalley=Ipk−ΔIp",
        "DCM退磁时间由匝比、输出电压和Vin决定"
      ],
      "waveform": "原边电流斜坡：DCM从零升至Ipk后回零；CCM在非零谷值上升；副边电流只在MOS关断期间出现。",
      "selection": "在最低输入/最大负载和最高输入/轻载分别计算模式边界；核对频率变化、限流和磁件温升。",
      "debug": "模式与预期不符先核对Lm、fs、负载、匝比、输入电压和电流探头偏置。",
      "mistakes": "用单一输入电压波形判定整个范围的工作模式；忽略轻载跳频和Burst。",
      "interfaces": "模式影响MOS/二极管RMS电流、磁件损耗和反馈环路；输出动态需按实际模式验证。",
      "questions": [
        "DCM与CCM最直观的电流波形区别是什么？",
        "负载增大时工作模式通常如何变化？",
        "BCM与DCM的边界条件是什么？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-03",
      "module": "flyback",
      "number": 3,
      "title": "反激占空比、匝比与反射电压设计",
      "status": "full",
      "summary": "反激占空比和匝比决定MOS关断时的反射电压及副边整流电压。需在最低/最高输入、输出容差和最大占空比之间折中。",
      "formula": [
        "VOR≈(Np/Ns)·(Vout+Vd)",
        "VDS,ideal≈Vin,max+VOR",
        "D≈VOR/(Vin+VOR)（CCM理想关系）"
      ],
      "waveform": "观察MOS VDS平台：关断后电压上升至Vin+反射电压，再叠加漏感尖峰；副边整流电流同步导通。",
      "selection": "按最低输入计算最大占空比和原边电流；按最高输入计算VDS应力；为钳位尖峰和输入浪涌留裕量。",
      "debug": "占空比过大查匝比、输入最低值和控制限幅；VDS过高查反射电压与漏感尖峰。",
      "mistakes": "只按最高输入选择MOS耐压；忘记把VOR、尖峰、浪涌和公差叠加。",
      "interfaces": "匝比同时影响副边二极管反压、MOS VDS、占空比和变压器窗口利用率。",
      "questions": [
        "VOR由哪些参数决定？",
        "MOS耐压为何要叠加漏感尖峰？",
        "匝比过大/过小分别有什么代价？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-04",
      "module": "flyback",
      "number": 4,
      "title": "励磁电感Lm、峰值电流与电流应力计算",
      "status": "full",
      "summary": "励磁电感Lm决定每周期储能和原边电流斜率。设计要由输出功率、效率、fs、最低输入和最大占空比反推峰值电流与Lm。",
      "formula": [
        "Pout≈η·½·Lm·Ipk²·fs（DCM）",
        "Ipk≈Vin,min·Dmax/(Lm·fs)",
        "Irms,p≈Ipk·√(D/3)（DCM三角波）"
      ],
      "waveform": "MOS导通时原边电流斜率为Vin/Lm；关断时观察退磁电流是否在下一周期前归零。",
      "selection": "先确定工作模式和Dmax，再求Ipk、Lm、RMS电流；用电流限制阈值和变压器饱和裕量校核。",
      "debug": "满载启动过流先查峰值限流、Lm偏差、输入电压和软启动；温升异常需复核RMS而非只看峰值。",
      "mistakes": "只按额定功率套用Lm经验值；忽略最低输入、频率容差和限流公差。",
      "interfaces": "Lm影响原边MOS、次级整流和磁芯储能；输出负载变化会改变退磁时间。",
      "questions": [
        "Lm减小后峰值电流如何变化？",
        "DCM功率公式中η、Lm、Ipk、fs分别代表什么？",
        "为什么要同时校核峰值和RMS电流？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-05",
      "module": "flyback",
      "number": 5,
      "title": "磁芯、气隙、磁通密度与变压器设计",
      "status": "full",
      "summary": "反激磁芯和气隙要在储能、磁通密度、损耗、窗口和绝缘之间平衡。气隙主要储存能量并降低磁芯直流偏置下的饱和风险。",
      "formula": [
        "ΔB≈Lm·ΔI/(Np·Ae)",
        "W=½·Lm·Ipk²",
        "lg≈μ0·Np²·Ae/Lm（气隙主导）"
      ],
      "waveform": "在最大负载观察原边电流峰值和斜率；磁芯饱和会使电流上升斜率在周期后段明显增大。",
      "selection": "选择Ae、Aw、材料和气隙；校核Bmax、铜线填充、原副边绝缘、磁芯损耗和高温条件。",
      "debug": "电感量合格但满载饱和，检查气隙和磁通密度；温升过高区分磁芯损耗与铜损。",
      "mistakes": "只按磁芯体积选择；忽略窗口装配、气隙公差、边缘磁场和爬电距离。",
      "interfaces": "变压器设计决定反激功率级和EMI；辅助绕组也需正确耦合以保证控制器供电。",
      "questions": [
        "气隙主要承担什么作用？",
        "磁通密度由哪些参数决定？",
        "为什么气隙边缘会使绕组损耗增加？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-06",
      "module": "flyback",
      "number": 6,
      "title": "MOSFET电压应力、漏感尖峰与钳位",
      "status": "full",
      "summary": "MOS关断时承受输入母线与反射电压之和，漏感产生额外尖峰和振铃。器件耐压必须按最坏工况和钳位残余尖峰选择。",
      "formula": [
        "VDS≈Vin+VOR+Vleak,spike",
        "E漏感≈½·Llk·Ipk²",
        "Pclamp≈E漏感·fs"
      ],
      "waveform": "测量VDS关断尖峰、平台和振铃；同步记录原边电流，确认尖峰能量与Ipk关系。",
      "selection": "按最高输入、最大反射电压、浪涌和钳位容差选MOS；差分探头直接跨MOS测量，缩短高压回路。",
      "debug": "VDS尖峰过高查漏感、钳位回路布局、RCD器件和探头接法；MOS雪崩发热需降低钳位电压/能量。",
      "mistakes": "只按Vin,max+VOR选MOS；钳位器件靠得远、回路寄生电感过大。",
      "interfaces": "MOS VDS应力和钳位损耗影响效率与EMI；变压器漏感和PCB热回路共同决定结果。",
      "questions": [
        "MOS关断电压由哪几部分构成？",
        "漏感能量与峰值电流有什么关系？",
        "为什么钳位回路必须紧凑？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-07",
      "module": "flyback",
      "number": 7,
      "title": "RCD、TVS与有源钳位方案比较",
      "status": "full",
      "summary": "RCD钳位通过电容/二极管/电阻吸收漏感能量；TVS提供较明确的钳位特性但需核对脉冲能力；有源钳位可回收部分能量并实现软开关，但控制更复杂。",
      "formula": [
        "Pclamp≈½·Llk·Ipk²·fs",
        "Vclamp需低于MOS设计耐压裕量",
        "PR≈V²/R"
      ],
      "waveform": "比较钳位前后的VDS尖峰、振铃衰减和RCD电容电压；记录钳位电阻温升。",
      "selection": "按漏感能量、重复频率和脉冲功率选RCD/TVS；有源钳位需验证时序、谐振和轻载工作。",
      "debug": "钳位电阻过热检查漏感、峰值电流和钳位电压；尖峰抑制不足检查布局与器件参数。",
      "mistakes": "只看VDS峰值而不测钳位电阻温升；TVS按单次浪涌能力代替重复脉冲能力。",
      "interfaces": "钳位方案与变压器漏感、MOS耐压和EMI联动；有源钳位还会改变控制策略。",
      "questions": [
        "RCD钳位主要吸收哪部分能量？",
        "TVS选型为什么要关注重复脉冲功率？",
        "有源钳位的主要优势和复杂度是什么？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-08",
      "module": "flyback",
      "number": 8,
      "title": "副边整流器、同步整流与输出电容",
      "status": "full",
      "summary": "副边整流器承受反向电压和脉冲电流；输出电容承担高频纹波与负载瞬态。同步整流可降低低压大电流应用的导通损耗。",
      "formula": [
        "Pdiode≈Vf·Iavg",
        "Psr≈Irms²·RDS(on)",
        "ΔVout≈ΔQ/C"
      ],
      "waveform": "MOS关断期间副边电流脉冲流入输出；测量整流器电压、电流、输出纹波和SR VGS。",
      "selection": "核对二极管反压、浪涌电流、恢复特性；SR需校准极性和关断时刻，输出电容核对纹波电流与ESR。",
      "debug": "输出纹波大查电容ESR/容量和整流回路；SR异常发热查反向导通和驱动时序。",
      "mistakes": "只按平均输出电流选二极管；忽略峰值/RMS电流和反向恢复。",
      "interfaces": "副边整流决定输出纹波和效率；反馈采样点应避开大电流脉冲回路。",
      "questions": [
        "二极管平均电流与峰值电流有什么区别？",
        "同步整流何时应关断？",
        "输出电容ESR如何影响纹波？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-09",
      "module": "flyback",
      "number": 9,
      "title": "TL431 + 光耦反馈与环路稳定性",
      "status": "full",
      "summary": "TL431与光耦构成隔离反馈：输出分压与基准比较后改变光耦电流，原边控制器调整峰值电流、占空比或频率。补偿网络决定动态稳定性。",
      "formula": [
        "Vout≈Vref·(Rtop+Rbot)/Rbot",
        "CTR=Iout,photo/Iled",
        "fcrossover需低于功率级有效带宽"
      ],
      "waveform": "负载阶跃观察Vout、COMP/FB、光耦电流和原边电流；检查启动、轻载和交越频率附近振荡。",
      "selection": "选TL431工作电流、光耦CTR分档与温漂；补偿网络按输出电容、ESR、工作模式和控制器类型设计。",
      "debug": "输出振荡先查反馈极性、光耦CTR、TL431偏置和补偿；启动过冲检查软启动与反馈延迟。",
      "mistakes": "只按室温CTR典型值；忽略光耦老化、温度和TL431最小阴极电流。",
      "interfaces": "反馈隔离连接低压输出与高压原边；输出采样地与功率回流要合理分离。",
      "questions": [
        "TL431如何通过光耦影响原边控制？",
        "CTR偏低会带来什么风险？",
        "负载阶跃如何判断环路稳定性？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    },
    {
      "id": "flyback-10",
      "module": "flyback",
      "number": 10,
      "title": "65W宽输入反激设计实战：176～276Vac、65kHz",
      "status": "full",
      "summary": "65W宽输入反激设计需同时覆盖176～276Vac、65kHz、满载、启动和异常工况。先定输入整流后的DC范围，再计算匝比、Lm、峰值电流、MOS应力与钳位。",
      "formula": [
        "Vin,pk≈√2·Vac（忽略整流压降）",
        "Ipk≈Vin,min·Dmax/(Lm·fs)",
        "Pout=65W；fs=65kHz"
      ],
      "waveform": "测量整流母线、VGS、VDS尖峰、原边电流、次级电流、Vout纹波和启动波形；低线满载通常是电流应力重点。",
      "selection": "分别按176Vac与276Vac计算；核对整流桥、Bulk电容、MOS耐压、二极管、变压器气隙、RCD和EMI。",
      "debug": "低线满载打嗝先查输入母线跌落、峰值限流和磁芯饱和；高线MOS过压查反射电压和钳位。",
      "mistakes": "只在230Vac典型点调试；忽略电解电容纹波、保持时间和温升。",
      "interfaces": "反激可作为辅助电源为PFC/LLC控制器提供VCC；启动供电和主功率时序要配合系统状态机。",
      "questions": [
        "176Vac满载为什么通常是电流应力重点？",
        "276Vac时MOS耐压主要受哪些项影响？",
        "65kHz下磁芯损耗与铜损如何分别验证？"
      ],
      "source_note": "工程化反激讲义；实际设计需按具体控制器、变压器结构、器件数据手册和安规要求复核。"
    }
  ],
  "updates": [
    {
      "date": "2026-11-05",
      "title": "知识库第二版：补齐四阶段课程主干",
      "detail": "细化PFC 22课工程内容；扩展磁性器件至12课；新增半桥LLC 12课与反激10课；完善搜索、波形示意和GitHub Pages自动发布流程。",
      "lesson_id": "mag-07"
    },
    {
      "date": "2026-11-04",
      "title": "学习平台首版课程索引",
      "detail": "收录PFC 22课、磁性器件6课的章节索引与工程摘要；建立搜索、课程详情、进度与更新记录。"
    }
  ],
  "next": {
    "module": "llc",
    "number": 13,
    "title": "LLC软启动参数整定与动态负载实测"
  }
};
